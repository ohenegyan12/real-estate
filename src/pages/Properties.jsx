import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import { propertyService } from '../services/api';
import { Search, ChevronDown, Filter, LayoutGrid, List, SlidersHorizontal, MapPin, Home as HomeIcon, Bed, Bath, ArrowRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Properties = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialType = queryParams.get('type') || 'All';
    const initialLocation = queryParams.get('location') || 'All';
    const initialBudget = queryParams.get('budget') || 'All';

    const [viewMode, setViewMode] = useState('grid');
    const [filterOpen, setFilterOpen] = useState(initialType !== 'All' || initialLocation !== 'All' || initialBudget !== 'All');
    const [loading, setLoading] = useState(true);
    const [allProperties, setAllProperties] = useState([]);
    const [locations, setLocations] = useState([]);
    const [types, setTypes] = useState([]);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const propertiesPerPage = 9;

    // Filters State
    const [filters, setFilters] = useState({
        type: initialType,
        status: 'All',
        location: initialLocation,
        priceRange: initialBudget,
        beds: 'All'
    });

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const [data, typesData, locData] = await Promise.all([
                    propertyService.getAll(),
                    propertyService.getTypes(),
                    propertyService.getLocations()
                ]);
                setAllProperties(data);
                setTypes(typesData);
                setLocations(locData);
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProperties();
    }, []);

    useEffect(() => {
        const type = queryParams.get('type');
        const loc = queryParams.get('location');
        const budget = queryParams.get('budget');

        if (type || loc || budget) {
            setFilters(prev => ({
                ...prev,
                type: type || prev.type,
                location: loc || prev.location,
                priceRange: budget || prev.priceRange
            }));
            setFilterOpen(true);
        }
    }, [location.search]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    // Helper to parse price string to number
    const parsePrice = (priceStr) => {
        if (!priceStr) return 0;
        return parseFloat(priceStr.toString().replace(/[^0-9.]/g, '')) || 0;
    };

    // Filter logic
    const filteredProperties = allProperties.filter(p => {
        if (filters.type !== 'All' && p.type !== filters.type) return false;
        if (filters.status !== 'All' && p.status !== filters.status) return false;
        if (filters.location !== 'All' && p.location !== filters.location) return false;
        if (filters.beds !== 'All' && parseInt(p.beds) < parseInt(filters.beds)) return false;

        // Budget Filter
        if (filters.priceRange !== 'All') {
            const price = parsePrice(p.price);
            switch (filters.priceRange) {
                case 'low': if (price > 5000) return false; break;
                case 'medium': if (price < 5000 || price > 50000) return false; break;
                case 'high': if (price < 50000 || price > 500000) return false; break;
                case 'luxury': if (price < 500000) return false; break;
                default: break;
            }
        }

        return true;
    });

    // Pagination Logic
    const totalPages = Math.max(1, Math.ceil(filteredProperties.length / propertiesPerPage));
    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const paginatedProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            <Navbar />

            {/* Sub-header / Hero */}
            <section
                className="section-padding"
                style={{
                    paddingTop: 'clamp(12rem, 15vw, 15rem)',
                    paddingBottom: 'clamp(4rem, 8vw, 6rem)',
                    backgroundColor: 'var(--primary)',
                    backgroundImage: 'linear-gradient(rgba(30, 41, 59, 0.8), rgba(30, 41, 59, 0.8)), url("https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2592&auto=format&fit=crop")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                    textAlign: 'center'
                }}
            >
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: '800', marginBottom: '1rem', fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}
                    >
                        Find Your Perfect Property
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}
                    >
                        Browse through our extensive collection of premium listings across Ghana's most sought-after locations.
                    </motion.p>
                </div>
            </section>

            {/* Filter Bar */}
            <section style={{
                marginTop: '-3rem',
                position: 'relative',
                zIndex: 10,
                paddingBottom: '2rem'
            }}>
                <style>{`
                    .filter-bar-container {
                        backgroundColor: white;
                        border-radius: 24px;
                        padding: 1.5rem;
                        box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
                        display: flex;
                        flex-direction: column;
                        gap: 1.5rem;
                        background: white;
                    }
                    .filter-top-row {
                        display: flex;
                        gap: 1rem;
                        flex-wrap: wrap;
                        align-items: center;
                    }
                    .search-input-wrapper {
                        flex: 1;
                        min-width: 300px;
                        position: relative;
                    }
                    .filter-btn {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.75rem;
                        padding: 1.1rem 1.75rem;
                        border-radius: 16px;
                        border: 1px solid #e2e8f0;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s;
                        background: white;
                    }
                    .view-toggle {
                        display: flex;
                        border: 1px solid #e2e8f0;
                        border-radius: 16px;
                        overflow: hidden;
                    }
                    .results-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 2.5rem;
                        gap: 1rem;
                    }
                    .sort-wrapper {
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                    }
                    @media (max-width: 992px) {
                        .search-input-wrapper {
                            min-width: 100%;
                        }
                        .filter-btn {
                            flex: 1;
                        }
                        .filter-top-row .btn-primary {
                            width: 100%;
                            flex: none;
                        }
                        .results-header {
                            flex-direction: column;
                            align-items: flex-start;
                        }
                        .sort-wrapper {
                            width: 100%;
                        }
                    }
                    @media (max-width: 768px) {
                        .mobile-hide {
                            display: none;
                        }
                    }
                `}</style>
                <div className="container">
                    <div className="filter-bar-container">
                        {/* Search & Top Filters */}
                        <div className="filter-top-row">
                            <div className="search-input-wrapper">
                                <Search style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
                                <input
                                    type="text"
                                    placeholder="Search properties..."
                                    style={{
                                        width: '100%',
                                        padding: '1.25rem 1.25rem 1.25rem 3.5rem',
                                        borderRadius: '16px',
                                        border: '1px solid #e2e8f0',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.2s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                />
                            </div>

                            <button
                                onClick={() => setFilterOpen(!filterOpen)}
                                className="filter-btn"
                                style={{
                                    backgroundColor: filterOpen ? '#eff6ff' : 'white',
                                    color: filterOpen ? 'var(--accent)' : 'var(--primary)',
                                }}
                            >
                                <SlidersHorizontal size={20} />
                                <span className="mobile-hide">Filters</span>
                                <ChevronDown size={18} style={{ transform: filterOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                            </button>

                            <div className="view-toggle mobile-hide">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    style={{
                                        padding: '1.1rem',
                                        backgroundColor: viewMode === 'grid' ? '#eff6ff' : 'white',
                                        color: viewMode === 'grid' ? 'var(--accent)' : '#94a3b8',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <LayoutGrid size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    style={{
                                        padding: '1.1rem',
                                        backgroundColor: viewMode === 'list' ? '#eff6ff' : 'white',
                                        color: viewMode === 'list' ? 'var(--accent)' : '#94a3b8',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <List size={20} />
                                </button>
                            </div>

                            <button className="btn btn-primary" style={{
                                padding: '1.1rem 2rem',
                                borderRadius: '16px',
                                fontWeight: '700',
                            }}>
                                Search
                            </button>
                        </div>

                        {/* Expandable Filters */}
                        <AnimatePresence>
                            {filterOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                        gap: '1.5rem',
                                        paddingTop: '1.5rem',
                                        borderTop: '1px solid #f1f5f9'
                                    }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem', color: '#64748b' }}>Property Type</label>
                                            <div style={{ position: 'relative' }}>
                                                <select
                                                    value={filters.type}
                                                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                                                    style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', appearance: 'none', outline: 'none', backgroundColor: '#f8fafc' }}
                                                >
                                                    <option value="All">All Types</option>
                                                    {types.map(t => (
                                                        <option key={t} value={t}>{t}</option>
                                                    ))}
                                                    {types.length === 0 && (
                                                        <>
                                                            <option>House</option>
                                                            <option>Apartment</option>
                                                            <option>Villa</option>
                                                        </>
                                                    )}
                                                </select>
                                                <ChevronDown size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94a3b8' }} />
                                            </div>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem', color: '#64748b' }}>Status</label>
                                            <div style={{ position: 'relative' }}>
                                                <select
                                                    value={filters.status}
                                                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                                    style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', appearance: 'none', outline: 'none', backgroundColor: '#f8fafc' }}
                                                >
                                                    <option>All</option>
                                                    <option>For Sale</option>
                                                    <option>For Rent</option>
                                                </select>
                                                <ChevronDown size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94a3b8' }} />
                                            </div>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem', color: '#64748b' }}>Location</label>
                                            <div style={{ position: 'relative' }}>
                                                <select
                                                    value={filters.location}
                                                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                                    style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', appearance: 'none', outline: 'none', backgroundColor: '#f8fafc' }}
                                                >
                                                    <option value="All">All Locations</option>
                                                    {locations.map(loc => (
                                                        <option key={loc} value={loc}>{loc}</option>
                                                    ))}
                                                </select>
                                                <ChevronDown size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94a3b8' }} />
                                            </div>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem', color: '#64748b' }}>Price Range</label>
                                            <div style={{ position: 'relative' }}>
                                                <select style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', appearance: 'none', outline: 'none', backgroundColor: '#f8fafc' }}>
                                                    <option>Any Price</option>
                                                    <option>GH₵0 - GH₵500,000</option>
                                                    <option>GH₵500,000 - GH₵1M</option>
                                                    <option>GH₵1M - GH₵5M</option>
                                                    <option>GH₵5M+</option>
                                                </select>
                                                <ChevronDown size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94a3b8' }} />
                                            </div>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem', color: '#64748b' }}>Min Bedrooms</label>
                                            <div style={{ position: 'relative' }}>
                                                <select
                                                    value={filters.beds}
                                                    onChange={(e) => setFilters({ ...filters, beds: e.target.value })}
                                                    style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', appearance: 'none', outline: 'none', backgroundColor: '#f8fafc' }}
                                                >
                                                    <option>All</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4+</option>
                                                </select>
                                                <ChevronDown size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94a3b8' }} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <section style={{ padding: '2rem 0 8rem' }}>
                <div className="container">
                    {/* Results Header */}
                    <div className="results-header">
                        <div>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary)' }}>
                                {filteredProperties.length} Properties <span className="mobile-hide">Found</span>
                            </h2>
                            <p style={{ color: '#64748b' }}>Showing all listings</p>
                        </div>
                        <div className="sort-wrapper">
                            <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '600', whiteSpace: 'nowrap' }}>Sort By:</span>
                            <div style={{ position: 'relative', flex: 1 }}>
                                <select style={{ width: '100%', padding: '0.65rem 2.5rem 0.65rem 1rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none', appearance: 'none', backgroundColor: 'white', fontWeight: '600' }}>
                                    <option>Newest First</option>
                                    <option>Price (Low to High)</option>
                                    <option>Price (High to Low)</option>
                                    <option>Popularity</option>
                                </select>
                                <ChevronDown size={16} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94a3b8' }} />
                            </div>
                        </div>
                    </div>

                    {/* Properties Grid */}
                    <motion.div
                        layout
                        className={viewMode === 'grid' ? "grid-3" : ""}
                        style={{
                            display: viewMode === 'grid' ? 'grid' : 'flex',
                            flexDirection: viewMode === 'grid' ? 'unset' : 'column',
                            gap: '2rem'
                        }}
                    >
                        {paginatedProperties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </motion.div>

                    {/* No Results Fallback */}
                    {filteredProperties.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                backgroundColor: '#f1f5f9',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem'
                            }}>
                                <Search size={32} color="#94a3b8" />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>No properties found</h3>
                            <p style={{ color: '#64748b' }}>Try adjusting your filters to find what you're looking for.</p>
                            <button
                                onClick={() => setFilters({ type: 'All', status: 'All', location: 'All', priceRange: 'All', beds: 'All' })}
                                style={{ marginTop: '1.5rem', color: 'var(--accent)', fontWeight: '700', border: 'none', background: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                            >
                                Reset all filters
                            </button>
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredProperties.length > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '6rem' }}>
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: currentPage === 1 ? '#f1f5f9' : 'white',
                                    color: currentPage === 1 ? '#94a3b8' : 'var(--primary)',
                                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                                }}
                            >
                                <ChevronLeft size={20} />
                            </button>

                            {[...Array(totalPages)].map((_, i) => {
                                const pageNumber = i + 1;
                                // Basic pagination logic to show current, next, prev
                                if (
                                    totalPages <= 5 ||
                                    pageNumber === 1 ||
                                    pageNumber === totalPages ||
                                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                ) {
                                    return (
                                        <button
                                            key={pageNumber}
                                            onClick={() => setCurrentPage(pageNumber)}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '12px',
                                                border: pageNumber === currentPage ? 'none' : '1px solid #e2e8f0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: pageNumber === currentPage ? 'var(--accent)' : 'white',
                                                color: pageNumber === currentPage ? 'white' : 'var(--primary)',
                                                fontWeight: '700',
                                                cursor: 'pointer',
                                                boxShadow: pageNumber === currentPage ? '0 10px 15px -3px rgba(37, 99, 235, 0.4)' : 'none'
                                            }}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                } else if (
                                    (pageNumber === currentPage - 2 && pageNumber > 1) ||
                                    (pageNumber === currentPage + 2 && pageNumber < totalPages)
                                ) {
                                    return <span key={pageNumber} style={{ color: '#94a3b8' }}>...</span>;
                                }
                                return null;
                            })}

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: currentPage === totalPages ? '#f1f5f9' : 'white',
                                    color: currentPage === totalPages ? '#94a3b8' : 'var(--primary)',
                                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                                }}
                            >
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Properties;
