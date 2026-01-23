import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import Counter from '../components/Counter';
import { Search, ChevronDown, MapPin, Building, Home as HomeIcon, Building2, Store, ArrowLeft, ArrowRight, Users, ThumbsUp, CheckCircle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const [activeTab, setActiveTab] = useState('General');

    // Mock Data
    const properties = [
        {
            id: 1,
            title: "3 bedroom house for sale at East legon Hills",
            location: "East legon hills",
            price: 3263000,
            currency: "GH₵",
            priceSub: "50% accepted GH₵1,631,500",
            status: "For Sale",
            isNew: true,
            rating: 4.5,
            beds: 3,
            baths: 4,
            sqft: 500,
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Three (3) Bedroom Apartments For Rent at Madina",
            location: "Madina",
            price: 7500,
            currency: "GH₵",
            status: "For Rent",
            isNew: true,
            rating: 4.5,
            beds: 3,
            baths: 4,
            sqft: 500,
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Three (3) Bedroom Townhouse For Rent at Oyarifa",
            location: "Oyarifa",
            price: 4000,
            currency: "GH₵",
            status: "For Rent",
            isNew: true,
            rating: 4.5,
            beds: 3,
            baths: 3,
            sqft: 500,
            image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2670&auto=format&fit=crop"
        },
    ];

    return (
        <div>
            <Navbar />

            {/* Hero Section */}
            <section style={{
                position: 'relative',
                height: '100vh',
                minHeight: '1000px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                marginTop: '-80px'
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

                <div className="container" style={{ textAlign: 'center', maxWidth: '1100px', zIndex: 1, paddingTop: '100px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 style={{
                            fontSize: 'clamp(3.5rem, 6vw, 5.5rem)',
                            marginBottom: '1.5rem',
                            fontWeight: '800',
                            letterSpacing: '-2px',
                            lineHeight: 1.05,
                            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                        }}>
                            Discover Your <br />
                            <span style={{
                                color: 'transparent',
                                WebkitBackgroundClip: 'text',
                                backgroundImage: 'linear-gradient(to right, #fff, #bfdbfe)'
                            }}>
                                Dream Home
                            </span>
                        </h1>
                        <p style={{
                            fontSize: '1.25rem',
                            maxWidth: '600px',
                            margin: '0 auto 3rem auto',
                            opacity: 0.9,
                            fontWeight: '300'
                        }}>
                            Discover exclusive properties in prime locations with our curated real estate marketplace.
                        </p>
                    </motion.div>

                    {/* Search Component */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '100px', // Pill shape outer
                            padding: '10px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            display: 'flex',
                            alignItems: 'center',
                            maxWidth: '1500px',
                            margin: '0 auto'
                        }}
                    >
                        {/* Input Group 1 */}
                        <div style={{ flex: 1, padding: '0 1.5rem', borderRight: '1px solid #eee', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>Location</label>
                            <div style={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>
                                <select style={{
                                    width: '100%',
                                    border: 'none',
                                    outline: 'none',
                                    color: '#666',
                                    fontSize: '0.95rem',
                                    fontWeight: '500',
                                    backgroundColor: 'transparent',
                                    appearance: 'none',
                                    cursor: 'pointer'
                                }}>
                                    <option value="" disabled selected>Select City</option>
                                    <option value="Accra">Accra</option>
                                    <option value="Kumasi">Kumasi</option>
                                    <option value="Takoradi">Takoradi</option>
                                    <option value="Tema">Tema</option>
                                    <option value="Cape Coast">Cape Coast</option>
                                </select>
                                <ChevronDown size={16} color="#999" style={{ position: 'absolute', right: 0, pointerEvents: 'none' }} />
                            </div>
                        </div>

                        {/* Input Group 2 */}
                        <div style={{ flex: 1, padding: '0 1.5rem', borderRight: '1px solid #eee', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>Property Type</label>
                            <div style={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>
                                <select style={{
                                    width: '100%',
                                    border: 'none',
                                    outline: 'none',
                                    color: '#666',
                                    fontSize: '0.95rem',
                                    fontWeight: '500',
                                    backgroundColor: 'transparent',
                                    appearance: 'none',
                                    cursor: 'pointer'
                                }}>
                                    <option value="" disabled selected>Property Type</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="House">House</option>
                                    <option value="Land">Land</option>
                                    <option value="Office">Office</option>
                                    <option value="Commercial">Commercial</option>
                                </select>
                                <ChevronDown size={16} color="#999" style={{ position: 'absolute', right: 0, pointerEvents: 'none' }} />
                            </div>
                        </div>

                        {/* Input Group 3 */}
                        <div style={{ flex: 1.2, padding: '0 1.5rem', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>Price Range</label>
                            <div style={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>
                                <select style={{
                                    width: '100%',
                                    border: 'none',
                                    outline: 'none',
                                    color: '#666',
                                    fontSize: '0.95rem',
                                    fontWeight: '500',
                                    backgroundColor: 'transparent',
                                    appearance: 'none',
                                    cursor: 'pointer'
                                }}>
                                    <option value="" disabled selected>Budge</option>
                                    <option value="Any">Any Price</option>
                                    <option value="low">GH₵ 1,000 - 5,000</option>
                                    <option value="medium">GH₵ 5,000 - 50,000</option>
                                    <option value="high">GH₵ 50,000 - 500,000</option>
                                    <option value="luxury">GH₵ 500,000+</option>
                                </select>
                                <ChevronDown size={16} color="#999" style={{ position: 'absolute', right: '-20px', pointerEvents: 'none' }} />
                            </div>
                        </div>

                        {/* Search Button */}
                        <button style={{
                            backgroundColor: 'var(--accent)',
                            color: 'white',
                            borderRadius: '50px',
                            padding: '1rem 2rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            height: '54px', // Match height visually
                            boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)',
                            transition: 'all 0.3s'
                        }}
                            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(37, 99, 235, 0.4)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(37, 99, 235, 0.3)'; }}
                        >
                            <Search size={20} />
                            Search
                        </button>
                    </motion.div>

                    {/* Floating Stats or Tags underneath */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
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
                style={{ padding: '8rem 0', backgroundColor: '#fff' }}
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

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '2rem'
                    }}>
                        {[
                            { icon: <Building size={28} />, title: 'Apartments', count: '230+ Properties' },
                            { icon: <HomeIcon size={28} />, title: 'Modern Houses', count: '140+ Properties' },
                        ].map((category, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10 }}
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
                                    {category.icon}
                                </div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary)', fontWeight: '700', letterSpacing: '-0.5px' }}>{category.title}</h3>
                                <p style={{ color: 'var(--text-light)', fontSize: '1rem', marginBottom: '1.5rem' }}>{category.count}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '600', fontSize: '0.95rem' }}>
                                    Explore <ArrowRight size={18} color="var(--accent)" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Featured Properties */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                style={{ padding: '8rem 0', backgroundColor: '#f9f9f9' }}
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

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                        gap: '2.5rem'
                    }}>
                        {properties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <button className="btn btn-primary" style={{ padding: '1rem 2.5rem', borderRadius: '50px', fontSize: '1rem' }}>
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
                style={{ padding: '6rem 0', backgroundColor: '#111827', color: 'white' }}
            >
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '2rem',
                        textAlign: 'center'
                    }}>
                        {[
                            { icon: <HomeIcon size={32} color="white" />, to: 2500, label: 'Properties Sold' },
                            { icon: <Users size={32} color="white" />, to: 850, label: 'Happy Clients' },
                            { icon: <Building2 size={32} color="white" />, to: 150, label: 'Awards Won' },
                            { icon: <MapPin size={32} color="white" />, to: 15, label: 'Cities Covered' },
                        ].map((stat, index) => (
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
                style={{ padding: '8rem 0', backgroundColor: '#fff' }}
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
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '2rem'
                    }}>
                        {[
                            { name: 'Spintex', count: '24 Properties', image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2670&auto=format&fit=crop' },
                            { name: 'Oyarifa', count: '12 Properties', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2670&auto=format&fit=crop' },
                            { name: 'East Airport', count: '12 Properties', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop' },
                            { name: 'Tse Addo', count: '10 Properties', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop' },
                            { name: 'Adenta', count: '8 Properties', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop' },
                            { name: 'Lakeside', count: '7 Properties', image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2670&auto=format&fit=crop' },
                        ].map((location, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10 }}
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
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Real Estate Solutions */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                style={{ padding: '8rem 0', backgroundColor: '#fff' }}
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
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '2.5rem'
                        }}>
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
                style={{ padding: '8rem 0', backgroundColor: '#f9fafb' }}
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

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                        gap: '2.5rem',
                        marginBottom: '4rem'
                    }}>
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
                        <button className="btn btn-outline" style={{ padding: '1rem 2.5rem', borderRadius: '50px', fontSize: '1rem', border: '2px solid var(--primary)', color: 'var(--primary)', fontWeight: '600' }}>
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
                style={{ padding: '6rem 0', backgroundColor: '#2563eb', color: 'white', position: 'relative', overflow: 'hidden' }}
            >
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>

                        {/* Left Side - Content */}
                        <div>
                            <h2 style={{
                                fontSize: '3.5rem',
                                marginBottom: '1.5rem',
                                fontFamily: 'var(--font-heading)',
                                fontWeight: '800',
                                lineHeight: 1.1,
                                textTransform: 'capitalize'
                            }}>
                                Ready to find your <br />
                                <span style={{ color: '#93c5fd' }}>dream home?</span>
                            </h2>
                            <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', opacity: 0.9, lineHeight: 1.6, maxWidth: '500px' }}>
                                Your perfect property is just a click away. Explore our exclusive listings and find the home that matches your lifestyle.
                            </p>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button style={{
                                    padding: '1.25rem 2.5rem',
                                    borderRadius: '50px',
                                    border: 'none',
                                    backgroundColor: 'white',
                                    color: '#2563eb',
                                    fontSize: '1.125rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    boxShadow: '0 10px 25px -5px rgba(255, 255, 255, 0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem'
                                }}>
                                    Explore Properties <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Right Side - Image */}
                        <div style={{ position: 'relative' }}>
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
