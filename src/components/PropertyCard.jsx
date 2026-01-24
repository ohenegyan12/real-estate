import React from 'react';
import { MapPin, Bed, Bath, Square, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
    return (
        <Link to={`/property/${property.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <motion.div
                whileHover={{ y: -12 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{
                    backgroundColor: 'white',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(0,0,0,0.04)',
                    cursor: 'pointer',
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
            >
                {/* Image Section */}
                <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                    <img
                        src={property.image}
                        alt={property.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    />

                    {/* Tags Layer */}
                    <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', display: 'flex', gap: '0.5rem', zIndex: 2 }}>
                        <span style={{
                            backgroundColor: property.status === 'For Rent' ? 'rgba(255, 140, 0, 0.95)' : 'rgba(37, 99, 235, 0.95)',
                            color: 'white',
                            padding: '0.4rem 1rem',
                            borderRadius: '50px',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            backdropFilter: 'blur(8px)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            {property.status}
                        </span>
                        {property.isNew && (
                            <span style={{
                                backgroundColor: 'rgba(16, 185, 129, 0.95)',
                                color: 'white',
                                padding: '0.4rem 1rem',
                                borderRadius: '50px',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                backdropFilter: 'blur(8px)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                New
                            </span>
                        )}
                    </div>

                    {/* Gradient Overlay for info/favorite toggle visibility */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '40%',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
                        pointerEvents: 'none'
                    }} />

                    {/* Favorite Button */}
                    <button style={{
                        position: 'absolute',
                        top: '1.25rem',
                        right: '1.25rem',
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        zIndex: 2,
                        transition: 'all 0.3s ease'
                    }}
                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.transform = 'scale(1.1)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)'; e.currentTarget.style.transform = 'scale(1)'; }}
                    >
                        <Heart size={20} color="#ef4444" strokeWidth={2} />
                    </button>
                </div>

                {/* Content Section */}
                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Price & Rating Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '-1px' }}>
                            <span style={{ color: 'var(--accent)', fontSize: '1.2rem', marginRight: '2px' }}>{property.currency || 'GH₵'}</span>
                            {property.price.toLocaleString()}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#fff7ed', padding: '6px 10px', borderRadius: '12px' }}>
                            <Star size={16} fill="#f59e0b" color="#f59e0b" />
                            <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#9a3412' }}>{property.rating || '4.8'}</span>
                        </div>
                    </div>

                    <h3 style={{
                        fontSize: '1.25rem',
                        marginBottom: '0.75rem',
                        color: 'var(--primary)',
                        fontWeight: '800',
                        lineHeight: '1.35',
                        fontFamily: 'var(--font-heading)',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        height: '3.4rem'
                    }}>
                        {property.title || property.name}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                        <div style={{ minWidth: '18px' }}><MapPin size={18} color="var(--accent)" /></div>
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{property.location}</span>
                    </div>

                    {/* Divider */}
                    <div style={{ height: '1px', backgroundColor: '#f1f5f9', marginBottom: '1.5rem', marginTop: 'auto' }}></div>

                    {/* Features Grid */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: 'var(--primary)',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ backgroundColor: '#eff6ff', padding: '6px', borderRadius: '8px', display: 'flex' }}>
                                <Bed size={16} color="var(--accent)" />
                            </div>
                            <span>{property.beds} <span style={{ color: '#94a3b8', fontWeight: '500' }}>Beds</span></span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ backgroundColor: '#eff6ff', padding: '6px', borderRadius: '8px', display: 'flex' }}>
                                <Bath size={16} color="var(--accent)" />
                            </div>
                            <span>{property.baths} <span style={{ color: '#94a3b8', fontWeight: '500' }}>Baths</span></span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ backgroundColor: '#eff6ff', padding: '6px', borderRadius: '8px', display: 'flex' }}>
                                <Square size={16} color="var(--accent)" />
                            </div>
                            <span>{property.sqft} <span style={{ color: '#94a3b8', fontWeight: '500' }}>sqft</span></span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default PropertyCard;
