import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    transition: 'all 0.3s ease',
                }}
            >
                {/* Top Bar - Contact Info */}
                <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    color: 'white',
                    padding: '0.5rem 0',
                    fontSize: '0.85rem',
                    backdropFilter: 'blur(4px)',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                }} className="mobile-hide">
                    <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Phone size={14} />
                                <span>0553364848</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Mail size={14} />
                                <span>owusuhomesgh@gmail.com</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <Link to="/login" style={{ fontWeight: '500' }}>Login</Link>
                            <Link to="/signup" style={{ fontWeight: '500' }}>Sign Up</Link>
                        </div>
                    </div>
                </div>

                {/* Main Navbar */}
                <div style={{
                    backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
                    padding: '1rem 0',
                    transition: 'all 0.3s ease',
                    borderBottom: scrolled ? 'none' : '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                        {/* Logo */}
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.8rem', fontWeight: '800', color: scrolled ? 'var(--primary)' : 'white' }}>
                            <img src="/logo.jpeg" alt="Owusu Homes Logo" style={{ height: '40px', width: '40px', objectFit: 'cover', borderRadius: '50%' }} />
                            <span>Owusu <span style={{ color: scrolled ? 'var(--primary)' : 'white' }}>Homes</span></span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="desktop-menu" style={{ alignItems: 'center', gap: '2.5rem' }}>
                            {['Home', 'Properties', 'About', 'Blog', 'Contact'].map((item) => (
                                <Link
                                    key={item}
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    style={{
                                        color: scrolled ? 'var(--primary)' : 'white',
                                        fontWeight: '500',
                                        fontSize: '1rem',
                                    }}
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            style={{
                                color: scrolled ? 'var(--primary)' : 'white'
                            }}
                            className="mobile-toggle"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        backgroundColor: 'white',
                        padding: '2rem',
                        boxShadow: 'var(--shadow-lg)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        zIndex: 999
                    }}>
                        {['Home', 'Properties', 'About', 'Blog', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                onClick={() => setIsOpen(false)}
                                style={{
                                    color: 'var(--primary)',
                                    fontSize: '1.1rem',
                                    fontWeight: '500'
                                }}
                            >
                                {item}
                            </Link>
                        ))}
                        <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '500' }}>Login</Link>
                            <Link to="/signup" style={{ color: 'var(--accent)', fontWeight: '700' }}>Sign Up</Link>
                        </div>
                    </div>
                )}
                <style>{`
          .desktop-menu { display: flex; }
          .mobile-toggle { display: none; }
          @media (max-width: 768px) {
            .desktop-menu { display: none !important; }
            .mobile-toggle { display: block !important; }
          }
        `}</style>
            </nav>
        </>
    );
};

export default Navbar;
