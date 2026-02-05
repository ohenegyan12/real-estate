import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import Counter from '../components/Counter';
import { propertyService, settingsService, categoryService } from '../services/api';
import { Search, ChevronDown, MapPin, Building, Home as HomeIcon, Building2, Store, ArrowLeft, ArrowRight, Users, ThumbsUp, CheckCircle, Calendar, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('General');
    const [properties, setProperties] = useState([]);
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [types, setTypes] = useState([]);
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchForm, setSearchForm] = useState({
        location: '',
        type: '',
        budget: ''
    });

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchForm.location) params.append('location', searchForm.location);
        if (searchForm.type) params.append('type', searchForm.type);
        if (searchForm.budget) params.append('budget', searchForm.budget);
        navigate(`/properties?${params.toString()}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [propsData, settingsData, catData, typesData, locData] = await Promise.all([
                    propertyService.getAll(),
                    settingsService.get(),
                    categoryService.getAll(),
                    propertyService.getTypes(),
                    propertyService.getLocations()
                ]);
                setProperties(propsData); // Store all properties to get accurate count
                setSettings(settingsData);
                setCategories(catData);
                setTypes(typesData);
                setLocations(locData);
            } catch (error) {
                console.error('Error fetching home data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Helper to parse strings like "1,200+" into numbers for the counter
    const parseStat = (val) => {
        if (!val) return 0;
        const cleaned = val.toString().replace(/[^0-9]/g, '');
        return parseInt(cleaned) || 0;
    };

    // Format stats for the counter section
    const getStats = () => {
        const propsStat = settings?.stats?.propertiesListed;
        const experienceStat = settings?.stats?.yearsExperience;
        const clientsStat = settings?.stats?.happyClients;
        const awardsStat = settings?.stats?.awardsWon;

        return [
            {
                icon: <Calendar size={32} color="white" />,
                to: parseStat(experienceStat),
                label: 'Years Experience'
            },
            {
                icon: <HomeIcon size={32} color="white" />,
                to: (propsStat !== undefined && propsStat !== null && propsStat !== '')
                    ? parseStat(propsStat)
                    : properties.length,
                label: 'Properties Listed'
            },
            {
                icon: <Users size={32} color="white" />,
                to: parseStat(clientsStat),
                label: 'Happy Clients'
            },
            {
                icon: <Award size={32} color="white" />,
                to: parseStat(awardsStat),
                label: 'Awards Won'
            },
        ];
    };

    return (
        <div>
            <Navbar />

            {/* Hero Section */}
            <section style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                marginTop: '-80px',
                paddingTop: '80px'
            }}>
                {/* Background Image with Parallax-like fixed attachment or just cover */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'url(https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2584&auto=format&fit=crop)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: -2 // Behind overlay
                }} />

                {/* Gradient Overlay for better text readability */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))',
                    zIndex: -1
                }} />

                <style>{`
                    .hero-container-inner {
                        text-align: center;
                        max-width: 1200px;
                        z-index: 1;
                        padding-top: 40px;
                    }
                    @media (max-width: 768px) {
                        .hero-container-inner {
                            padding-top: 160px;
                            padding-bottom: 40px;
                        }
                        .hero-container-inner h1 {
                            font-size: clamp(2.5rem, 10vw, 4rem) !important;
                            margin-bottom: 1.5rem !important;
                        }
                    }
                `}</style>
                <div className="container hero-container-inner">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h1 style={{
                            fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
                            marginBottom: '2rem',
                            fontWeight: '900',
                            letterSpacing: '-3px',
                            lineHeight: 1,
                            textShadow: '0 10px 30px rgba(0,0,0,0.2)'
                        }}>
                            Discover Your <br />
                            <span style={{
                                color: 'transparent',
                                WebkitBackgroundClip: 'text',
                                backgroundImage: 'linear-gradient(to right, #ffffff, #93c5fd)',
                                display: 'inline-block'
                            }}>
                                Dream Sanctuary
                            </span>
                        </h1>
                        <p style={{
                            fontSize: '1.4rem',
                            maxWidth: '750px',
                            margin: '0 auto 4rem auto',
                            opacity: 0.95,
                            fontWeight: '400',
                            lineHeight: 1.6,
                            color: 'white'
                        }}>
                            Exclusive properties in Ghana's most prestigious locations. <br className="mobile-hide" />

                        </p>
                    </motion.div>

                    {/* Search Component */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hero-search-container"
                        style={{ display: 'flex' }}
                    >
                        {/* Input Group 1 */}
                        <div className="search-group">
                            <label className="search-label">Location</label>
                            <div className="search-input-wrapper">
                                <select
                                    className="search-select"
                                    value={searchForm.location}
                                    onChange={(e) => setSearchForm({ ...searchForm, location: e.target.value })}
                                >
                                    <option value="">Select City</option>
                                    {locations.map(loc => (
                                        <option key={loc} value={loc}>{loc}</option>
                                    ))}
                                    {locations.length === 0 && (
                                        <>
                                            <option value="Accra">Accra</option>
                                            <option value="Kumasi">Kumasi</option>
                                        </>
                                    )}
                                </select>
                                <ChevronDown size={16} color="#999" className="select-icon" />
                            </div>
                        </div>

                        {/* Input Group 2 */}
                        <div className="search-group">
                            <label className="search-label">Property Type</label>
                            <div className="search-input-wrapper">
                                <select
                                    className="search-select"
                                    value={searchForm.type}
                                    onChange={(e) => setSearchForm({ ...searchForm, type: e.target.value })}
                                >
                                    <option value="">Property Type</option>
                                    {types.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                    {types.length === 0 && (
                                        <>
                                            <option value="Apartment">Apartment</option>
                                            <option value="House">House</option>
                                        </>
                                    )}
                                </select>
                                <ChevronDown size={16} color="#999" className="select-icon" />
                            </div>
                        </div>

                        {/* Input Group 3 */}
                        <div className="search-group no-border">
                            <label className="search-label">Price Range</label>
                            <div className="search-input-wrapper">
                                <select
                                    className="search-select"
                                    value={searchForm.budget}
                                    onChange={(e) => setSearchForm({ ...searchForm, budget: e.target.value })}
                                >
                                    <option value="">Budget</option>
                                    <option value="luxury">GH₵ 500,000+</option>
                                    <option value="high">GH₵ 50,000 - 500,000</option>
                                    <option value="medium">GH₵ 5,000 - 50,000</option>
                                    <option value="low">GH₵ 1,000 - 5,000</option>
                                </select>
                                <ChevronDown size={16} color="#999" className="select-icon" />
                            </div>
                        </div>

                        {/* Search Button */}
                        <button className="search-btn" onClick={handleSearchSubmit}>
                            <Search size={20} />
                            <span>Search</span>
                        </button>
                    </motion.div>

                    {/* Floating Stats or Tags underneath */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mobile-hide"
                        style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', fontWeight: '500' }}
                    >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={16} color="var(--success)" /> 1000+ New Listings</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={16} color="var(--success)" /> Trusted Agents</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={16} color="var(--success)" /> Verified Properties</span>
                    </motion.div>
                </div>
            </section>

            {/* Explore by Category */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="section-padding"
                style={{ backgroundColor: '#fff' }}
            >
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{
                            fontSize: '2.5rem',
                            marginBottom: '1rem',
                            color: 'var(--primary)',
                            fontFamily: 'var(--font-heading)'
                        }}>
                            Explore by Category
                        </h2>
                        <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
                            Find your perfect property from our wide range of options across different categories
                        </p>
                    </div>

                    <div className="grid-3">
                        {categories.map((category, index) => {
                            const IconComponent = {
                                'Building': Building,
                                'Home': HomeIcon,
                                'Building2': Building2,
                                'Store': Store
                            }[category.icon] || Building;

                            return (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -10 }}
                                    onClick={() => navigate(`/properties?type=${category.type}`)}
                                    style={{
                                        backgroundColor: '#fff',
                                        borderRadius: '24px',
                                        padding: '3rem 2rem',
                                        textAlign: 'left',
                                        border: '1px solid #f3f4f6',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--accent)';
                                        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(37, 99, 235, 0.1), 0 8px 10px -6px rgba(37, 99, 235, 0.1)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.borderColor = '#f3f4f6';
                                        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.02)';
                                    }}
                                >
                                    <div style={{
                                        width: '64px',
                                        height: '64px',
                                        backgroundColor: '#eff6ff',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '1.5rem',
                                        color: 'var(--accent)'
                                    }}>
                                        <IconComponent size={28} />
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary)', fontWeight: '700', letterSpacing: '-0.5px' }}>{category.title}</h3>
                                    <p style={{ color: 'var(--text-light)', fontSize: '1rem', marginBottom: '1.5rem' }}>{category.count}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '600', fontSize: '0.95rem' }}>
                                        Explore <ArrowRight size={18} color="var(--accent)" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.section>

            {/* Featured Properties */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="section-padding"
                style={{ backgroundColor: '#f9f9f9' }}
            >
                <div className="container">
                    {/* Centered Header */}
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span style={{
                            display: 'inline-block',
                            padding: '0.5rem 1rem',
                            backgroundColor: '#eff6ff',
                            color: 'var(--accent)',
                            borderRadius: '50px',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            marginBottom: '1rem',
                            letterSpacing: '0.5px'
                        }}>
                            FEATURED LISTINGS
                        </span>
                        <h2 style={{
                            fontSize: '3rem',
                            marginBottom: '1rem',
                            color: 'var(--primary)',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: '800',
                            letterSpacing: '-1px'
                        }}>
                            Unlock the Door to Your New Home
                        </h2>
                        <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            Explore our handpicked selection of exclusive properties, designed to offer you the ultimate in comfort and style.
                        </p>
                    </div>

                    <div className="grid-3">
                        {properties.slice(0, 3).map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <button
                            onClick={() => navigate('/properties')}
                            className="btn btn-primary"
                            style={{ padding: '1rem 2.5rem', borderRadius: '50px', fontSize: '1rem' }}
                        >
                            View All Properties <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                        </button>
                    </div>
                </div>
            </motion.section>

            {/* Stats Section */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="section-padding"
                style={{ backgroundColor: '#111827', color: 'white' }}
            >
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1.5rem',
                        textAlign: 'center'
                    }} className="grid-cols-1-mobile">
                        {getStats().map((stat, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10 }}
                                style={{
                                    padding: '2rem',
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '24px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    backdropFilter: 'blur(10px)'
                                }}
                            >
                                <div style={{
                                    width: '70px', height: '70px', borderRadius: '20px',
                                    backgroundColor: 'var(--accent)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: '1.5rem',
                                    boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)'
                                }}>
                                    {stat.icon}
                                </div>
                                <div style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '0.5rem', lineHeight: 1 }}>
                                    <Counter from={0} to={stat.to} /><span style={{ color: 'var(--accent)' }}>+</span>
                                </div>
                                <div style={{ color: '#9ca3af', fontSize: '1.1rem', fontWeight: '500' }}>{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Top Locations */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="section-padding"
                style={{ backgroundColor: '#fff' }}
            >
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span style={{
                            display: 'inline-block',
                            padding: '0.5rem 1rem',
                            backgroundColor: '#eff6ff',
                            color: 'var(--accent)',
                            borderRadius: '50px',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            marginBottom: '1rem',
                            letterSpacing: '0.5px'
                        }}>
                            EXPLORE CITIES
                        </span>
                        <h2 style={{
                            fontSize: '3rem',
                            marginBottom: '1rem',
                            color: 'var(--primary)',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: '800',
                            letterSpacing: '-1px'
                        }}>
                            Discover Most Popular Locations
                        </h2>
                        <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            Find properties in the most desirable neighborhoods and prime locations across the country.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '1.5rem'
                    }} className="grid-cols-1-mobile">
                        {(() => {
                            const locCounts = properties.reduce((acc, p) => {
                                if (!p.location) return acc;
                                acc[p.location] = (acc[p.location] || 0) + 1;
                                return acc;
                            }, {});

                            const locImages = {
                                'Default': '/image.png'
                            };

                            const locs = Object.entries(locCounts)
                                .map(([name, count]) => {
                                    const normalizedName = name.trim();
                                    return {
                                        name: normalizedName,
                                        count: `${count} Propert${count === 1 ? 'y' : 'ies'}`,
                                        image: '/image.png'
                                    };
                                })
                                .sort((a, b) => parseInt(b.count) - parseInt(a.count))
                                .slice(0, 6);

                            // If no properties, show defaults so section isn't empty
                            const displayLocs = locs.length > 0 ? locs : [
                                { name: 'Spintex', count: '0 Properties', image: '/image.png' },
                                { name: 'Oyarifa', count: '0 Properties', image: '/image.png' },
                                { name: 'East Airport', count: '0 Properties', image: '/image.png' }
                            ];

                            return displayLocs.map((location, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -10 }}
                                    onClick={() => navigate(`/properties?location=${location.name}`)}
                                    style={{
                                        position: 'relative',
                                        height: '350px',
                                        borderRadius: '24px',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                    }}
                                >
                                    <img
                                        src={location.image}
                                        alt={location.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.7s ease'
                                        }}
                                        onMouseOver={(e) => e.target.style.transform = 'scale(1.15)'}
                                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        padding: '2rem'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                            <div>
                                                <h3 style={{ color: 'white', fontSize: '1.75rem', marginBottom: '0.5rem', fontWeight: '700' }}>{location.name}</h3>
                                                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    {location.count} <ArrowRight size={16} color="var(--accent)" />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ));
                        })()}
                    </div>
                </div>
            </motion.section>

            {/* Real Estate Solutions */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="section-padding"
                style={{ backgroundColor: '#fff' }}
            >
                <div className="container">
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                            <span style={{
                                display: 'inline-block',
                                padding: '0.5rem 1rem',
                                backgroundColor: '#eff6ff',
                                color: 'var(--accent)',
                                borderRadius: '50px',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                marginBottom: '1rem',
                                letterSpacing: '0.5px'
                            }}>
                                OUR EXPERTISE
                            </span>
                            <h2 style={{
                                fontSize: '3rem',
                                marginBottom: '1rem',
                                color: 'var(--primary)',
                                fontFamily: 'var(--font-heading)',
                                fontWeight: '800',
                                letterSpacing: '-1px'
                            }}>
                                Real Estate Solutions Made Easy
                            </h2>
                            <p style={{ color: 'var(--text-light)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
                                We simplify the complex world of real estate with our comprehensive suite of services designed to help you succeed.
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '2rem'
                        }} className="grid-cols-1-mobile">
                            {[
                                { title: 'Buy a Property', desc: 'Find your dream home with our advanced search tools and expert guidance.', icon: <HomeIcon size={40} color="var(--accent)" /> },
                                { title: 'Sell a Property', desc: 'Get the best price for your property with our strategic marketing and negotiation.', icon: <Store size={40} color="var(--accent)" /> },
                                { title: 'Rent a Home', desc: 'Explore thousands of rental listings to find the perfect place for your lifestyle.', icon: <Building size={40} color="var(--accent)" /> },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -10 }}
                                    style={{
                                        backgroundColor: '#fff',
                                        borderRadius: '24px',
                                        padding: '3rem 2rem',
                                        textAlign: 'center',
                                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
                                        border: '1px solid #f3f4f6',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <div style={{
                                        width: '90px', height: '90px', borderRadius: '50%',
                                        backgroundColor: '#eff6ff',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 2rem auto'
                                    }}>
                                        {item.icon}
                                    </div>
                                    <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--primary)' }}>{item.title}</h3>
                                    <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>{item.desc}</p>
                                    <a href="#" style={{ color: 'var(--accent)', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                        Learn More <ArrowRight size={18} />
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Latest Blog Posts */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="section-padding"
                style={{ backgroundColor: '#f9fafb' }}
            >
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span style={{
                            display: 'inline-block',
                            padding: '0.5rem 1rem',
                            backgroundColor: '#eff6ff',
                            color: 'var(--accent)',
                            borderRadius: '50px',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            marginBottom: '1rem',
                            letterSpacing: '0.5px'
                        }}>
                            NEWS & INSIGHTS
                        </span>
                        <h2 style={{
                            fontSize: '3rem',
                            marginBottom: '1rem',
                            color: 'var(--primary)',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: '800',
                            letterSpacing: '-1px'
                        }}>
                            Latest From Our Blog
                        </h2>
                        <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            Stay ahead of the market with expert advice, industry trends, and latest real estate news.
                        </p>
                    </div>

                    <div className="grid-3" style={{ marginBottom: '4rem' }}>
                        {[
                            {
                                category: "Buying Tips",
                                title: "How to Buy a House with Low Income",
                                date: "June 12, 2023",
                                desc: "Discover the strategies and programs available to help low-income families achieve homeownership.",
                                image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2670&auto=format&fit=crop"
                            },
                            {
                                category: "Selling Guide",
                                title: "10 Things to Consider Before Selling",
                                date: "May 28, 2023",
                                desc: "Planning to sell your home? Here are important factors to consider before putting it on the market.",
                                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
                            },
                            {
                                category: "Market Trends",
                                title: "The Rise of Smart Homes: Trends",
                                date: "May 15, 2023",
                                desc: "Explore the latest smart home technologies that are transforming the way we live and interact.",
                                image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop"
                            }
                        ].map((post, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10 }}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%'
                                }}
                            >
                                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.5s ease'
                                        }}
                                        onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        top: '1.5rem',
                                        left: '1.5rem',
                                        backgroundColor: 'white',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '50px',
                                        fontSize: '0.8rem',
                                        fontWeight: '700',
                                        color: 'var(--primary)',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                    }}>
                                        {post.date}
                                    </div>
                                </div>
                                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{
                                        color: 'var(--accent)',
                                        fontWeight: '700',
                                        fontSize: '0.85rem',
                                        textTransform: 'uppercase',
                                        marginBottom: '0.75rem',
                                        letterSpacing: '0.5px'
                                    }}>
                                        {post.category}
                                    </div>
                                    <h3 style={{
                                        fontSize: '1.4rem',
                                        marginBottom: '1rem',
                                        color: 'var(--primary)',
                                        fontWeight: '700',
                                        lineHeight: 1.3
                                    }}>
                                        {post.title}
                                    </h3>
                                    <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6 }}>{post.desc}</p>

                                    <a href="#" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        color: 'var(--primary)',
                                        fontWeight: '700',
                                        marginTop: 'auto'
                                    }}>
                                        Read Article <ArrowRight size={18} color="var(--accent)" />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <button className="btn btn-outline" style={{ padding: '1rem 2.5rem', borderRadius: '50px', fontSize: '1rem', border: '2px solid var(--primary)', fontWeight: '600' }}>
                            View All Articles
                        </button>
                    </div>
                </div>
            </motion.section>



            {/* CTA Section */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="section-padding"
                style={{ backgroundColor: '#2563eb', color: 'white', position: 'relative', overflow: 'hidden' }}
            >
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>

                        {/* Left Side - Content */}
                        <div>
                            <h2 style={{
                                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                                marginBottom: '1.5rem',
                                fontFamily: 'var(--font-heading)',
                                fontWeight: '800',
                                lineHeight: 1.1,
                                textTransform: 'capitalize'
                            }}>
                                Ready to find your <br className="mobile-hide" />
                                <span style={{ color: '#93c5fd' }}>dream home?</span>
                            </h2>
                            <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', opacity: 0.9, lineHeight: 1.6, maxWidth: '500px' }}>
                                Your perfect property is just a click away. Explore our exclusive listings and find the home that matches your lifestyle.
                            </p>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={() => navigate('/properties')}
                                    style={{
                                        padding: '1.25rem 2.5rem',
                                        borderRadius: '50px',
                                        border: '2px solid white',
                                        backgroundColor: 'transparent',
                                        color: 'white',
                                        fontSize: '1.125rem',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem'
                                    }}>
                                    Explore Properties <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Right Side - Image */}
                        <div style={{ position: 'relative' }} className="mobile-hide">
                            <div style={{
                                position: 'absolute',
                                top: '20px',
                                right: '-20px',
                                width: '100px',
                                height: '100px',
                                background: 'rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '50%',
                                zIndex: 0
                            }}></div>
                            <img
                                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2500&auto=format&fit=crop"
                                alt="Dream Home"
                                style={{
                                    width: '100%',
                                    borderRadius: '30px',
                                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                                    transform: 'rotate(-2deg)',
                                    border: '8px solid rgba(255,255,255,0.1)',
                                    position: 'relative',
                                    zIndex: 1
                                }}
                            />
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Footer */}
            <Footer />
            <style>{`
            .search-grid {
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            }
            @media (min-width: 900px) {
                .search-grid {
                    grid-template-columns: 2fr 1.2fr 1.2fr 1.5fr !important;
                }
            }
            `}</style>
        </div>
    );
};

export default Home;
