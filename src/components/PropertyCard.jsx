import React from 'react';
import { MapPin, Bed, Bath, Square, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
    return (
        <Link to={`/property/${property.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                    border: '1px solid #f0f0f0',
                    cursor: 'pointer',
                    position: 'relative'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.3)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)';
                    e.currentTarget.style.borderColor = '#f0f0f0';
                }}
            >
                {/* Image Section */}
                <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                    <img
                        src={property.image}
                        alt={property.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.7s ease'
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    />

                    {/* Glassmorphism Tags */}
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem' }}>
                        <span style={{
                            backgroundColor: property.status === 'For Rent' ? 'rgba(249, 115, 22, 0.9)' : 'rgba(37, 99, 235, 0.9)',
                            color: 'white',
                            padding: '0.35rem 0.85rem',
                            borderRadius: '30px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            backdropFilter: 'blur(4px)',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}>
                            {property.status}
                        </span>
                        {property.isNew && (
                            <span style={{
                                backgroundColor: 'rgba(16, 185, 129, 0.9)',
                                color: 'white',
                                padding: '0.35rem 0.85rem',
                                borderRadius: '30px',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                backdropFilter: 'blur(4px)',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}>
                                New
                            </span>
                        )}
                    </div>

                    {/* Favorite Button */}
                    <button style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s'
                    }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <Heart size={18} color="#ef4444" />
                    </button>
                </div>

                {/* Content Section */}
                <div style={{ padding: '1.5rem' }}>
                    {/* Price & Rating Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent)', letterSpacing: '-0.5px' }}>
                                {property.currency || 'GH₵'}{property.price.toLocaleString()}
                            </div>
                            {property.priceSub && (
                                <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: '600', marginTop: '2px' }}>
                                    {property.priceSub}
                                </div>
                            )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#fffbeb', padding: '4px 8px', borderRadius: '6px' }}>
                            <Star size={14} fill="#f59e0b" color="#f59e0b" />
                            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#b45309' }}>{property.rating || '4.8'}</span>
                        </div>
                    </div>

                    <h3 style={{
                        fontSize: '1.15rem',
                        marginBottom: '0.5rem',
                        color: 'var(--primary)',
                        fontWeight: '700',
                        lineHeight: '1.4',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        height: '3.2rem'
                    }}>
                        {property.title}
                    </h3>

                    {/* Location */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-light)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        <MapPin size={16} color="#9ca3af" />
                        <span>{property.location}</span>
                    </div>

                    {/* Divider */}
                    <div style={{ height: '1px', backgroundColor: '#f3f4f6', marginBottom: '1rem' }}></div>

                    {/* Footer Stats */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: 'var(--text-light)',
                        fontSize: '0.9rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Bed size={18} color="var(--primary)" />
                            <span style={{ fontWeight: '500' }}>{property.beds} <span style={{ color: '#9ca3af', fontWeight: '400' }}>Beds</span></span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Bath size={18} color="var(--primary)" />
                            <span style={{ fontWeight: '500' }}>{property.baths} <span style={{ color: '#9ca3af', fontWeight: '400' }}>Baths</span></span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Square size={18} color="var(--primary)" />
                            <span style={{ fontWeight: '500' }}>{property.sqft} <span style={{ color: '#9ca3af', fontWeight: '400' }}>sqft</span></span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default PropertyCard;
