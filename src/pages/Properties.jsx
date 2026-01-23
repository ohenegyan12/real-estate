import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import { Search, ChevronDown, Filter, LayoutGrid, List, SlidersHorizontal, MapPin, Home as HomeIcon, Bed, Bath, ArrowRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Properties = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [filterOpen, setFilterOpen] = useState(false);

    // Filters State
    const [filters, setFilters] = useState({
        type: 'All',
        status: 'All',
        location: 'All',
        priceRange: 'All',
        beds: 'All'
    });

    // Mock Data
    const allProperties = [
        {
            id: 1,
            title: "3 Bedroom House for Sale at East Legon Hills",
            location: "East Legon Hills, Accra",
            price: 3263000,
            currency: "GH₵",
            priceSub: "50% accepted GH₵1,631,500",
            status: "For Sale",
            type: "House",
            isNew: true,
            rating: 4.8,
            beds: 3,
            baths: 4,
            sqft: 2500,
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Luxury 3 Bedroom Apartment For Rent",
            location: "Madina, Accra",
            price: 7500,
            currency: "GH₵",
            status: "For Rent",
            type: "Apartment",
            isNew: true,
            rating: 4.5,
            beds: 3,
            baths: 3,
            sqft: 1800,
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Modern 3 Bedroom Townhouse",
            location: "Oyarifa, Accra",
            price: 4500,
            currency: "GH₵",
            status: "For Rent",
            type: "Townhouse",
            isNew: false,
            rating: 4.6,
            beds: 3,
            baths: 3,
            sqft: 2000,
            image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2670&auto=format&fit=crop"
        },
        {
            id: 4,
            title: "Executive 5 Bedroom Villa with Pool",
            location: "Airport Residential, Accra",
            price: 12500000,
            currency: "GH₵",
            status: "For Sale",
            type: "Villa",
            isNew: true,
            rating: 4.9,
            beds: 5,
            baths: 6,
            sqft: 5500,
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2500&auto=format&fit=crop"
        },
        {
            id: 5,
            title: "Compact 2 Bedroom Suite",
            location: "Cantonments, Accra",
            price: 12000,
            currency: "GH₵",
            status: "For Rent",
            type: "Apartment",
            isNew: false,
            rating: 4.7,
            beds: 2,
            baths: 2,
            sqft: 1200,
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2670&auto=format&fit=crop"
        },
        {
            id: 6,
            title: "4 Bedroom Family Home",
            location: "Tema Community 25",
            price: 2800000,
            currency: "GH₵",
            status: "For Sale",
            type: "House",
            isNew: false,
            rating: 4.4,
            beds: 4,
            baths: 4,
            sqft: 3200,
            image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2574&auto=format&fit=crop"
        },
        {
            id: 7,
            title: "Studio Apartment at The Gallery",
            location: "Shiashie, Accra",
            price: 5000,
            currency: "GH₵",
            status: "For Rent",
            type: "Apartment",
            isNew: true,
            rating: 4.8,
            beds: 1,
            baths: 1,
            sqft: 600,
            image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2670&auto=format&fit=crop"
        },
        {
            id: 8,
            title: "Contemporary 4 Bedroom Home",
            location: "Spintex, Accra",
            price: 4500000,
            currency: "GH₵",
            status: "For Sale",
            type: "House",
            isNew: false,
            rating: 4.6,
            beds: 4,
            baths: 4,
            sqft: 3800,
            image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2670&auto=format&fit=crop"
        },
        {
            id: 9,
            title: "Office Space in High-Rise",
            location: "Ridge, Accra",
            price: 15000,
            currency: "GH₵",
            status: "For Rent",
            type: "Office",
            isNew: false,
            rating: 4.5,
            beds: 0,
            baths: 2,
            sqft: 2200,
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop"
        }
    ];

    // Filter logic
    const filteredProperties = allProperties.filter(p => {
        if (filters.type !== 'All' && p.type !== filters.type) return false;
        if (filters.status !== 'All' && p.status !== filters.status) return false;
        if (filters.beds !== 'All' && p.beds < parseInt(filters.beds)) return false;
        return true;
    });

    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            <Navbar />

            {/* Sub-header / Hero */}
            <section
                className="section-padding"
                style={{
                    paddingTop: 'clamp(10rem, 13vw, 12rem)',
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
                <div className="container">
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '24px',
                        padding: '1.5rem',
                        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem'
                    }}>
                        {/* Search & Top Filters */}
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                            <div style={{ flex: 1, minWidth: window.innerWidth > 768 ? '300px' : '100%', position: 'relative' }}>
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
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem',
                                    padding: '1.1rem 1.75rem',
                                    borderRadius: '16px',
                                    border: '1px solid #e2e8f0',
                                    backgroundColor: filterOpen ? '#eff6ff' : 'white',
                                    color: filterOpen ? 'var(--accent)' : 'var(--primary)',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    flex: window.innerWidth <= 768 ? 1 : 'none'
                                }}
                            >
                                <SlidersHorizontal size={20} />
                                <span className="mobile-hide">Filters</span>
                                <ChevronDown size={18} style={{ transform: filterOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                            </button>

                            <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden' }} className="mobile-hide">
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
                                flex: window.innerWidth <= 768 ? '100%' : 'none',
                                width: window.innerWidth <= 768 ? '100%' : 'auto'
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
                                    }} className="grid-cols-1-mobile">
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem', color: '#64748b' }}>Property Type</label>
                                            <div style={{ position: 'relative' }}>
                                                <select
                                                    value={filters.type}
                                                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                                                    style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', appearance: 'none', outline: 'none', backgroundColor: '#f8fafc' }}
                                                >
                                                    <option>All</option>
                                                    <option>House</option>
                                                    <option>Apartment</option>
                                                    <option>Townhouse</option>
                                                    <option>Villa</option>
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', gap: '1rem' }} className="mobile-stack">
                        <div>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary)' }}>
                                {filteredProperties.length} Properties <span className="mobile-hide">Found</span>
                            </h2>
                            <p style={{ color: '#64748b' }}>Showing all listings</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: window.innerWidth <= 768 ? '100%' : 'auto' }}>
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
                        style={{
                            display: 'grid',
                            gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(300px, 1fr))' : '1fr',
                            gap: '2rem'
                        }}
                        className="grid-cols-1-mobile"
                    >
                        {filteredProperties.map((property) => (
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
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '6rem' }}>
                        <button disabled style={{ width: '50px', height: '50px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9', color: '#94a3b8', cursor: 'not-allowed' }}>
                            <ChevronLeft size={20} />
                        </button>
                        {[1, 2, 3].map((page) => (
                            <button
                                key={page}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '12px',
                                    border: page === 1 ? 'none' : '1px solid #e2e8f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: page === 1 ? 'var(--accent)' : 'white',
                                    color: page === 1 ? 'white' : 'var(--primary)',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    boxShadow: page === 1 ? '0 10px 15px -3px rgba(37, 99, 235, 0.4)' : 'none'
                                }}
                            >
                                {page}
                            </button>
                        ))}
                        <button style={{ width: '40px', border: 'none', background: 'none', color: '#94a3b8' }}>...</button>
                        <button style={{ width: '50px', height: '50px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', color: 'var(--primary)', cursor: 'pointer' }}>
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Properties;
