import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { propertyService } from '../services/api';
import {
    MapPin, Bed, Bath, Square, Star, Heart, Share2, Printer,
    CheckCircle2, Phone, Calendar, Mail, User, ShieldCheck,
    ArrowRight, ChevronLeft, ChevronRight, Play, Maximize2, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PropertyDetail = () => {
    const { id } = useParams();
    const [activeImage, setActiveImage] = useState(0);
    const [paymentPeriod, setPaymentPeriod] = useState('4 Months');
    const [isFavorite, setIsFavorite] = useState(false);
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const data = await propertyService.getAll();
                const found = data.find(p => p.id === parseInt(id) || p.id === id);
                if (found) {
                    // Normalize data structure for UI if needed
                    setProperty({
                        ...found,
                        images: (found.images && found.images.length > 0) ? found.images : (found.image ? [found.image] : ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80']),
                        reviews: found.reviews || 24,
                        rating: found.rating || 4.8,
                        yearBuilt: found.yearBuilt || new Date().getFullYear(),
                        sqft: found.sqft || found.size || 'N/A',
                        description: found.description || "No description provided.",
                        amenities: found.amenities || [],
                        // Default to company contact if specific agent not found
                        agent: found.agent || {
                            name: "Owusu Homes Agent",
                            role: "Sales Team",
                            image: "https://images.unsplash.com/photo-1560250097-9b93dbd96cd8?q=80&w=250&auto=format&fit=crop", // Stock agent photo
                            phone: "0553364848",
                            email: "owusuhomesgh@gmail.com"
                        }
                    });
                }
            } catch (error) {
                console.error('Error fetching property detail:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <div style={{ paddingTop: '15rem', textAlign: 'center' }}>Loading property details...</div>;
    if (!property) return <div style={{ paddingTop: '15rem', textAlign: 'center' }}>Property not found.</div>;

    const nextImage = () => setActiveImage((prev) => (prev + 1) % property.images.length);
    const prevImage = () => setActiveImage((prev) => (prev - 1 + property.images.length) % property.images.length);

    return (
        <div style={{ backgroundColor: 'white', minHeight: '100vh', paddingBottom: '4rem' }}>
            <Navbar />

            {/* Back Button */}
            <div className="container" style={{ paddingTop: '8rem', paddingBottom: '1rem' }}>
                <Link to="/properties" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem', fontWeight: '500', width: 'fit-content' }}>
                    <ChevronLeft size={18} /> Back to Properties
                </Link>
            </div>

            <div className="container" style={{ maxWidth: '1280px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem' }} className="detail-grid">
                    {/* Left Column: Image */}
                    <div>
                        <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '600px', backgroundColor: '#f1f5f9' }}>
                            <img
                                src={property.images[0]}
                                alt={property.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            {/* Badges */}
                            <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
                                <span style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700' }}>
                                    {property.status}
                                </span>
                            </div>
                            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
                                <span style={{ backgroundColor: '#10b981', color: 'white', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '700' }}>
                                    New
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b', fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                            <Star size={18} fill="#f59e0b" /> {property.rating} Rating
                        </div>

                        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1a1a1a', lineHeight: '1.2', marginBottom: '1rem' }}>
                            {property.title || property.name}
                        </h1>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', marginBottom: '2rem' }}>
                            <MapPin size={18} /> {property.location}
                        </div>

                        {/* Price Section */}
                        <div style={{ marginBottom: '2.5rem' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.5px' }}>
                                {property.currency}{property.price.toLocaleString()}
                            </div>
                            {property.hasPaymentPlan && (
                                <div style={{ color: '#10b981', fontWeight: '600', fontSize: '1rem', marginTop: '0.25rem' }}>
                                    50% accepted {property.currency}{(parseInt(property.price.toString().replace(/[^0-9]/g, '')) / 2).toLocaleString()}
                                </div>
                            )}
                        </div>

                        {/* Payment Plan Calculator */}
                        {property.hasPaymentPlan && (
                            <div style={{ backgroundColor: '#f8fafc', borderRadius: '16px', padding: '2rem', marginBottom: '2.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                    <Calendar size={20} color="var(--accent)" />
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1a1a1a' }}>Payment Plan</h3>
                                </div>
                                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                    Choose your preferred payment period for the remaining 50% ({property.currency}{(parseInt(property.price.toString().replace(/[^0-9]/g, '')) / 2).toLocaleString()})
                                </p>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                                    {[
                                        { months: 4 },
                                        { months: 8 },
                                        { months: 12 }
                                    ].map((plan) => {
                                        const cleanPrice = parseInt(property.price.toString().replace(/[^0-9]/g, '')) || 0;
                                        const monthlyAmount = Math.round((cleanPrice / 2) / plan.months);
                                        const isSelected = paymentPeriod === `${plan.months} Months`;

                                        return (
                                            <button
                                                key={plan.months}
                                                onClick={() => setPaymentPeriod(`${plan.months} Months`)}
                                                style={{
                                                    backgroundColor: 'white',
                                                    border: isSelected ? '2px solid var(--accent)' : '1px solid #e2e8f0',
                                                    borderRadius: '12px',
                                                    padding: '1rem',
                                                    cursor: 'pointer',
                                                    textAlign: 'left',
                                                    transition: 'all 0.2s',
                                                    position: 'relative'
                                                }}
                                            >
                                                {isSelected && (
                                                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--accent)', opacity: 0.05, borderRadius: '10px' }}></div>
                                                )}
                                                <div style={{ fontWeight: '800', fontSize: '0.9rem', color: isSelected ? 'var(--accent)' : '#1a1a1a', marginBottom: '0.25rem' }}>
                                                    {plan.months} Months
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                                    {property.currency}{monthlyAmount.toLocaleString()}/month
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                    <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '600', marginBottom: '0.25rem' }}>
                                        Selected Plan: <span style={{ color: '#1a1a1a' }}>{paymentPeriod}</span>
                                    </div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent)' }}>
                                        {property.currency}{Math.round((parseInt(property.price.toString().replace(/[^0-9]/g, '')) / 2) / parseInt(paymentPeriod)).toLocaleString()}/month
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Features Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '16px', marginBottom: '2.5rem' }}>
                            <div style={{ textAlign: 'center' }}>
                                <Bed size={24} style={{ marginBottom: '0.5rem', color: '#64748b' }} />
                                <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>{property.beds}</div>
                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Bedrooms</div>
                            </div>
                            <div style={{ textAlign: 'center', borderLeft: '1px solid #e2e8f0' }}>
                                <Bath size={24} style={{ marginBottom: '0.5rem', color: '#64748b' }} />
                                <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>{property.baths}</div>
                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Bathrooms</div>
                            </div>
                            <div style={{ textAlign: 'center', borderLeft: '1px solid #e2e8f0' }}>
                                <Square size={24} style={{ marginBottom: '0.5rem', color: '#64748b' }} />
                                <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>{property.sqft}</div>
                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Square Feet</div>
                            </div>
                        </div>

                        {/* Contact Button */}
                        <a
                            href={`tel:${property.agent.phone.replace(/\s+/g, '')}`}
                            className="btn-accent"
                            style={{
                                width: '100%',
                                padding: '1.25rem',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                fontWeight: '700',
                                justifyContent: 'center',
                                display: 'flex',
                                textDecoration: 'none',
                                alignItems: 'center'
                            }}
                        >
                            <Phone size={20} style={{ marginRight: '0.5rem' }} /> Contact Agent
                        </a>
                    </div>
                </div>

                <style>{`
                    @media (max-width: 1024px) {
                        .detail-grid {
                            grid-template-columns: 1fr !important;
                            gap: 2rem !important;
                        }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default PropertyDetail;
