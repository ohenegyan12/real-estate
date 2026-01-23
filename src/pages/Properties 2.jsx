import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import PropertyCard from '../components/PropertyCard';
import { Search, ChevronDown, Filter, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Properties = () => {
    // Mock Data
    const allProperties = [
        {
            id: 1,
            title: "3 bedroom house for sale at East legon Hills",
            location: "East legon hills",
            price: 3263000,
            currency: "GH₵",
            priceSub: "50% accepted GH₵1,631,500",
            status: "For Sale",
            isNew: true,
            beds: 3,
            baths: 3,
            sqft: 2500,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1600596542815-3ad19e81d7f6?q=80&w=2000&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Luxury 2 Bedroom Apartment in Cantonments",
            location: "Cantonments, Accra",
            price: 450000,
            currency: "$",
            status: "For Rent",
            isNew: true,
            beds: 2,
            baths: 2,
            sqft: 1200,
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Modern 4 Bedroom Townhouse",
            location: "Airport Residential Area",
            price: 850000,
            currency: "$",
            status: "For Sale",
            isNew: false,
            beds: 4,
            baths: 4.5,
            sqft: 3200,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop"
        },
        {
            id: 4,
            title: "Executive 5 Bedroom House",
            location: "Trasacco Valley",
            price: 1200000,
            currency: "$",
            status: "For Sale",
            isNew: true,
            beds: 5,
            baths: 6,
            sqft: 5000,
            rating: 5.0,
            image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2000&auto=format&fit=crop"
        },
        {
            id: 5,
            title: "Cozy 1 Bedroom Studio Loft",
            location: "Osu, Accra",
            price: 1500,
            currency: "$",
            status: "For Rent",
            isNew: false,
            beds: 1,
            baths: 1,
            sqft: 600,
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2000&auto=format&fit=crop"
        },
        {
            id: 6,
            title: "Premium Office Space",
            location: "Ridge, Accra",
            price: 3500,
            currency: "$",
            status: "For Rent",
            isNew: true,
            beds: 0,
            baths: 2,
            sqft: 1500,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
        },
        {
            id: 7,
            title: "Spacious Family Home",
            location: "Spintex Road",
            price: 280000,
            currency: "$",
            status: "For Sale",
            isNew: false,
            beds: 4,
            baths: 3,
            sqft: 2800,
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2000&auto=format&fit=crop"
        },
        {
            id: 8,
            title: "Contemporary Villa with Pool",
            location: "Aburi Mountains",
            price: 950000,
            currency: "$",
            status: "For Sale",
            isNew: true,
            beds: 5,
            baths: 5,
            sqft: 4000,
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2000&auto=format&fit=crop"
        }
    ];

    const [filterLocation, setFilterLocation] = useState('');
    const [filterType, setFilterType] = useState('All');

    return (
        <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            {/* Header Section */}
            <div style={{
                backgroundColor: '#1e3a8a',
                color: 'white',
                padding: '8rem 0 4rem',
                textAlign: 'center',
                backgroundImage: 'linear-gradient(rgba(30, 58, 138, 0.9), rgba(30, 58, 138, 0.8)), url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
                        Find Your Perfect Property
                    </h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
                        Browse our exclusive listings of homes, apartments, and office spaces available for sale and rent.
                    </p>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="container" style={{ marginTop: '-2rem', marginBottom: '4rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
                <div style={{
                    backgroundColor: 'white',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}>
                    <div style={{ flex: '1 1 200px' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#4b5563', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MapPin size={16} /> Location
                        </div>
                        <input
                            type="text"
                            placeholder="Enter city, zip, or neighborhood"
                            value={filterLocation}
                            onChange={(e) => setFilterLocation(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb', outline: 'none' }}
                        />
                    </div>
                    <div style={{ flex: '1 1 200px' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#4b5563', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <HomeIcon size={16} /> Property Type
                        </div>
                        <div style={{ position: 'relative' }}>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb', outline: 'none', appearance: 'none', backgroundColor: 'white' }}
                            >
                                <option value="All">All Properties</option>
                                <option value="House">House</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Office">Office</option>
                            </select>
                            <ChevronDown size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#9ca3af' }} />
                        </div>
                    </div>
                    <div style={{ flex: '1 1 200px' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#4b5563', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Filter size={16} /> Price Range
                        </div>
                        <div style={{ position: 'relative' }}>
                            <select
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb', outline: 'none', appearance: 'none', backgroundColor: 'white' }}
                            >
                                <option value="Any">Any Price</option>
                                <option value="Low">Under $100k</option>
                                <option value="Mid">$100k - $500k</option>
                                <option value="High">$500k+</option>
                            </select>
                            <ChevronDown size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#9ca3af' }} />
                        </div>
                    </div>
                    <div style={{ flex: '0 0 auto', marginTop: 'auto' }}>
                        <button style={{
                            padding: '0.75rem 2rem',
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            height: '46px',
                            marginTop: '23px'
                        }}>
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Property Grid */}
            <div className="container" style={{ paddingBottom: '6rem', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>
                        Showing {allProperties.length} Properties
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Sort by:</span>
                        <select style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #e5e7eb', outline: 'none', backgroundColor: 'transparent', fontWeight: '600' }}>
                            <option>Newest Listed</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {allProperties.map(property => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>

                {/* Pagination */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem', gap: '0.5rem' }}>
                    <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #e5e7eb', backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</button>
                    <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', backgroundColor: 'var(--primary)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</button>
                    <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #e5e7eb', backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</button>
                    <button style={{ padding: '0 1rem', height: '40px', borderRadius: '20px', border: '1px solid #e5e7eb', backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Next</button>
                </div>
            </div>

            {/* Footer */}
            <footer style={{ backgroundColor: '#111', color: 'white', padding: '5rem 0' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem' }}>
                    <div style={{ flex: '1 1 300px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--accent)' }}>
                            <img src="/logo.jpeg" alt="Owusu Homes Logo" style={{ height: '32px', width: '32px', objectFit: 'cover', borderRadius: '50%' }} />
                            <span>Owusu Homes</span>
                        </div>
                        <p style={{ color: '#aaa', lineHeight: 1.8 }}>
                            Your gateway to exceptional living. We connect you with the most desired real estate properties and investment opportunities.
                        </p>
                    </div>

                    <div style={{ flex: '1 1 150px' }}>
                        <h4 style={{ marginBottom: '1.5rem', color: 'white', fontSize: '1.2rem' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', color: '#aaa', padding: 0 }}>
                            <li style={{ marginBottom: '0.8rem' }}><a href="/" className="hover-text-accent">Home</a></li>
                            <li style={{ marginBottom: '0.8rem' }}><a href="#" className="hover-text-accent">Properties</a></li>
                            <li style={{ marginBottom: '0.8rem' }}><a href="#" className="hover-text-accent">Agents</a></li>
                            <li style={{ marginBottom: '0.8rem' }}><a href="#" className="hover-text-accent">About Us</a></li>
                        </ul>
                    </div>

                    <div style={{ flex: '1 1 250px' }}>
                        <h4 style={{ marginBottom: '1.5rem', color: 'white', fontSize: '1.2rem' }}>Contact Us</h4>
                        <ul style={{ listStyle: 'none', color: '#aaa', padding: 0 }}>
                            <li style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                                <MapPin size={20} color="var(--accent)" />
                                <span>East Legon, Accra, Ghana</span>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                                <Search size={20} color="var(--accent)" />
                                <span>+233 55 336 4848</span>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                                <span>owusuhomesgh@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="container" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #333', textAlign: 'center', color: '#666' }}>
                    &copy; {new Date().getFullYear()} Owusu Homes. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

// Helper Icon for Header
const HomeIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

export default Properties;
