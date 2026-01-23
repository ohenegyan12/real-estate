import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
    MapPin, Bed, Bath, Square, Star, Heart, Share2, Printer,
    CheckCircle2, Phone, Calendar, Mail, User, ShieldCheck,
    ArrowRight, ChevronLeft, ChevronRight, Play, Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PropertyDetail = () => {
    const { id } = useParams();
    const [activeImage, setActiveImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    // Mock detailed data for a specific property (usually you'd fetch this based on ID)
    const property = {
        id: id,
        title: "Executive 5 Bedroom Villa with Private Pool & Garden",
        location: "Airport Residential Area, Accra",
        address: "Lane 5, Airport Residential, Accra, Ghana",
        price: 12500000,
        currency: "GH₵",
        status: "For Sale",
        isNew: true,
        rating: 4.9,
        reviews: 24,
        beds: 5,
        baths: 6,
        sqft: 5500,
        yearBuilt: 2023,
        type: "Villa",
        description: "Experience the pinnacle of luxury living in this magnificent 5-bedroom villa located in the heart of Accra's most prestigious neighborhood. This architectural masterpiece combines modern sophistication with timeless elegance, featuring expansive living spaces, high-end finishes, and a seamless indoor-outdoor flow perfect for entertaining.\n\nThe ground floor welcomes you with a grand double-height foyer leading to multiple formal and informal living areas. The gourmet kitchen is equipped with state-of-the-art appliances and a separate butler's pantry. Upstairs, you'll find five generous en-suite bedrooms, including a spectacular master suite with a private balcony, walk-in closets, and a spa-like bathroom.",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2500&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600596542815-3ad19e81d7f6?q=80&w=2669&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop"
        ],
        amenities: [
            "Swimming Pool", "Gym / Fitness Center", "24/7 Security", "Smart Home System",
            "Backup Power (Generator)", "Reserve Water Tank", "Modern Kitchen Appliances",
            "Private Garden", "Servant's Quarters", "High-speed Internet", "Walk-in Closets", "Electric Fencing"
        ],
        agent: {
            name: "Kwame Mensah",
            role: "Senior Real Estate Consultant",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
            phone: "+233 24 123 4567",
            email: "k.mensah@eliteliving.com"
        }
    };

    const nextImage = () => setActiveImage((prev) => (prev + 1) % property.images.length);
    const prevImage = () => setActiveImage((prev) => (prev - 1 + property.images.length) % property.images.length);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            <Navbar />

            {/* Breadcrumbs & Title Bar */}
            <section style={{ padding: '10rem 0 2rem', backgroundColor: 'white', borderBottom: '1px solid #f1f5f9' }}>
                <div className="container">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                        <Link to="/" style={{ color: '#64748b' }}>Home</Link>
                        <span>/</span>
                        <Link to="/properties" style={{ color: '#64748b' }}>Properties</Link>
                        <span>/</span>
                        <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Property Detail</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
                        <div style={{ flex: 1, minWidth: '300px' }}>
                            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                                <span style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '700' }}>{property.status}</span>
                                <span style={{ backgroundColor: '#f1f5f9', color: 'var(--primary)', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '700' }}>{property.type}</span>
                            </div>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1rem', fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}>
                                {property.title}
                            </h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#64748b' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <MapPin size={18} color="var(--accent)" />
                                    <span>{property.location}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <Star size={18} fill="#f59e0b" color="#f59e0b" />
                                    <span style={{ fontWeight: '700', color: 'var(--primary)' }}>{property.rating}</span>
                                    <span>({property.reviews} Reviews)</span>
                                </div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '-1px' }}>
                                {property.currency}{property.price.toLocaleString()}
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                <button style={{ width: '45px', height: '45px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', cursor: 'pointer' }}>
                                    <Share2 size={20} color="#64748b" />
                                </button>
                                <button
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    style={{ width: '45px', height: '45px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', cursor: 'pointer' }}
                                >
                                    <Heart size={20} fill={isFavorite ? "#ef4444" : "none"} color={isFavorite ? "#ef4444" : "#64748b"} />
                                </button>
                                <button style={{ width: '45px', height: '45px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', cursor: 'pointer' }}>
                                    <Printer size={20} color="#64748b" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Image Gallery */}
            <section style={{ padding: '2rem 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', height: '600px' }}>
                        {/* Main Image */}
                        <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                            <img src={property.images[activeImage]} alt="Main" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', display: 'flex', gap: '1rem' }}>
                                <button onClick={prevImage} style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
                                    <ChevronLeft size={24} color="var(--primary)" />
                                </button>
                                <button onClick={nextImage} style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
                                    <ChevronRight size={24} color="var(--primary)" />
                                </button>
                            </div>
                            <div style={{ position: 'absolute', top: '2rem', left: '2rem' }}>
                                <button style={{ padding: '0.75rem 1.5rem', borderRadius: '50px', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', backdropFilter: 'blur(10px)', fontWeight: '600' }}>
                                    <Maximize2 size={18} /> View All Photos
                                </button>
                            </div>
                        </div>

                        {/* Side Images Grid */}
                        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '1.5rem' }}>
                            <div style={{ borderRadius: '24px', overflow: 'hidden', position: 'relative' }}>
                                <img src={property.images[1]} alt="Gallery 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.1)', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0)'} onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.1)'}></div>
                            </div>
                            <div style={{ borderRadius: '24px', overflow: 'hidden', position: 'relative' }}>
                                <img src={property.images[2]} alt="Gallery 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>+{property.images.length - 3} More</div>
                                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>View Gallery</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Area */}
            <section style={{ padding: '3rem 0 8rem' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>

                    {/* Left Column - Details */}
                    <div>
                        {/* Quick Stats */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '1.5rem',
                            backgroundColor: 'white',
                            padding: '2rem',
                            borderRadius: '24px',
                            marginBottom: '3rem',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                        }}>
                            <div style={{ textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>
                                <div style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}><Bed size={24} /></div>
                                <div style={{ fontWeight: '800', fontSize: '1.2rem', color: 'var(--primary)' }}>{property.beds}</div>
                                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Bedrooms</div>
                            </div>
                            <div style={{ textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>
                                <div style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}><Bath size={24} /></div>
                                <div style={{ fontWeight: '800', fontSize: '1.2rem', color: 'var(--primary)' }}>{property.baths}</div>
                                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Bathrooms</div>
                            </div>
                            <div style={{ textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>
                                <div style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}><Square size={24} /></div>
                                <div style={{ fontWeight: '800', fontSize: '1.2rem', color: 'var(--primary)' }}>{property.sqft}</div>
                                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Sq Ft Area</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}><Calendar size={24} /></div>
                                <div style={{ fontWeight: '800', fontSize: '1.2rem', color: 'var(--primary)' }}>{property.yearBuilt}</div>
                                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Year Built</div>
                            </div>
                        </div>

                        {/* Description */}
                        <div style={{ marginBottom: '4rem' }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
                                Description
                            </h2>
                            <p style={{ color: 'var(--text-light)', lineHeight: 1.8, fontSize: '1.1rem', whiteSpace: 'pre-line' }}>
                                {property.description}
                            </p>
                        </div>

                        {/* Amenities */}
                        <div style={{ marginBottom: '4rem' }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
                                Amenities & Features
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                {property.amenities.map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--primary)', fontWeight: '500' }}>
                                        <CheckCircle2 size={18} color="var(--accent)" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Location Map Placeholder */}
                        <div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
                                Location
                            </h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', marginBottom: '1.5rem' }}>
                                <MapPin size={20} color="var(--accent)" />
                                <span>{property.address}</span>
                            </div>
                            <div style={{
                                height: '400px',
                                backgroundColor: '#f1f5f9',
                                borderRadius: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                {/* Map Background Image Placeholder */}
                                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2674&auto=format&fit=crop" alt="Map" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
                                <div style={{ position: 'absolute', backgroundColor: 'white', padding: '1.5rem', borderRadius: '20px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                                    <MapPin size={32} color="#ef4444" style={{ marginBottom: '0.5rem' }} />
                                    <div style={{ fontWeight: '700', color: 'var(--primary)' }}>Property Location</div>
                                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Accra, Ghana</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div>
                        {/* Agent Card */}
                        <div style={{
                            backgroundColor: 'white',
                            padding: '2.5rem',
                            borderRadius: '24px',
                            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)',
                            position: 'sticky',
                            top: '120px'
                        }}>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '2rem' }}>Contact Information</h3>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                <img
                                    src={property.agent.image}
                                    alt={property.agent.name}
                                    style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover' }}
                                />
                                <div>
                                    <div style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '1.1rem' }}>{property.agent.name}</div>
                                    <div style={{ color: 'var(--accent)', fontSize: '0.9rem', fontWeight: '600' }}>{property.agent.role}</div>
                                </div>
                            </div>

                            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input type="text" placeholder="Your Name" style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} />
                                <input type="email" placeholder="Your Email" style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} />
                                <input type="tel" placeholder="Your Phone" style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} />
                                <textarea placeholder="I'm interested in this property..." rows="4" style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', resize: 'none' }}></textarea>

                                <button className="btn btn-primary" style={{ padding: '1.25rem', borderRadius: '12px', width: '100%', marginTop: '1rem', fontWeight: '700' }}>
                                    Send Inquiry
                                </button>

                                <a href={`tel:${property.agent.phone}`} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem',
                                    padding: '1.25rem',
                                    borderRadius: '12px',
                                    border: '2px solid #e2e8f0',
                                    color: 'var(--primary)',
                                    fontWeight: '700',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s'
                                }}>
                                    <Phone size={20} color="var(--accent)" /> {property.agent.phone}
                                </a>
                            </form>

                            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#10b981', backgroundColor: '#ecfdf5', padding: '1rem', borderRadius: '12px', fontSize: '0.9rem' }}>
                                <ShieldCheck size={20} />
                                <span style={{ fontWeight: '600' }}>Verified Elite Living Agent</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    );
};

export default PropertyDetail;
