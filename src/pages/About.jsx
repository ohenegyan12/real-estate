import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { settingsService } from '../services/api';
import { CheckCircle2, Award, Users, Target, Rocket } from 'lucide-react';

const About = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await settingsService.get();
                setSettings(data);
            } catch (error) {
                console.error('Error fetching settings for about:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const stats = [
        { label: 'Years Experience', value: settings?.stats?.yearsExperience || '0', icon: <Rocket size={24} /> },
        { label: 'Properties Listed', value: settings?.stats?.propertiesListed || '0', icon: <Award size={24} /> },
        { label: 'Happy Clients', value: settings?.stats?.happyClients || '0', icon: <Users size={24} /> },
        { label: 'Awards Won', value: settings?.stats?.awardsWon || '0', icon: <Target size={24} /> },
    ];

    return (
        <div style={{ backgroundColor: '#f8fafc' }}>
            <Navbar />

            {/* Hero Section */}
            <section
                className="section-padding"
                style={{
                    paddingTop: 'clamp(12rem, 15vw, 15rem)',
                    paddingBottom: 'clamp(4rem, 8vw, 6rem)',
                    backgroundColor: 'var(--primary)',
                    backgroundImage: 'linear-gradient(rgba(30, 41, 59, 0.8), rgba(30, 41, 59, 0.8)), url("https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2670&auto=format&fit=crop")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                    textAlign: 'center'
                }}
            >
                <div className="container">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ color: 'var(--accent)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}
                    >
                        OUR STORY
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}
                    >
                        Redefining Living Spaces <br className="mobile-hide" /> in Ghana
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}
                    >
                        We are more than just a real estate company. We are dedicated professionals committed to helping you find the place you'll call home.
                    </motion.p>
                </div>
            </section>

            {/* Our Mission & Vision */}
            <section className="section-padding">
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(2rem, 5vw, 6rem)', alignItems: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2500&auto=format&fit=crop"
                            alt="About Owusu Homes"
                            style={{ width: '100%', borderRadius: '32px', boxShadow: '0 30px 60px -12px rgba(0,0,0,0.2)' }}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span style={{ color: 'var(--accent)', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>WHO WE ARE</span>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: 'var(--primary)', margin: '1rem 0 1.5rem', fontWeight: '800', fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}>
                            We Build Memories, Not Just Houses
                        </h2>
                        <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                            Founded in 2010, Owusu Homes has grown from a small consultancy to one of Ghana's leading luxury real estate firms. Our journey began with a simple mission: to make premium living accessible and transparent.
                        </p>
                        <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                            We pride ourselves on our deep understanding of the local market and our ability to deliver tailored solutions that meet the unique needs of every client. Whether you are buying, selling, or renting, we are here to guide you every step of the way.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {['Integrity in every transaction', 'Commitment to excellence', 'Customer-centric approach'].map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--primary)', fontWeight: '600' }}>
                                    <div style={{ color: 'var(--accent)' }}><CheckCircle2 size={24} /></div>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            {/* Stats Section */}
            <section className="section-padding" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                <div className="container">
                    <div className="grid-4">
                        {stats.map((stat, idx) => (
                            <div key={idx} style={{ textAlign: 'center' }}>
                                <div style={{ color: 'var(--accent)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
                                <div style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '0.5rem', lineHeight: 1 }}>{stat.value}</div>
                                <div style={{ opacity: 0.8, fontSize: '1.1rem', fontWeight: '500' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section-padding">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <span style={{ color: 'var(--accent)', fontWeight: '700', letterSpacing: '1px' }}>WHY CHOOSE US</span>
                        <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3rem)', color: 'var(--primary)', fontWeight: '800', fontFamily: 'var(--font-heading)', marginTop: '0.5rem', lineHeight: 1.1 }}>
                            The Owusu Homes Difference
                        </h2>
                    </div>

                    <div className="grid-3">
                        {[
                            { title: 'Local Expertise', description: 'Deep knowledge of Accra and surrounding prime real estate markets.' },
                            { title: 'Transparent Process', description: 'We believe in full transparency, keeping you informed at every stage.' },
                            { title: 'Premium Listings', description: 'Curated selection of high-quality properties in desirable locations.' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                style={{
                                    padding: '3rem',
                                    backgroundColor: 'white',
                                    borderRadius: '24px',
                                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)',
                                    border: '1px solid #f1f5f9'
                                }}
                            >
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '1rem' }}>{item.title}</h3>
                                <p style={{ color: 'var(--text-light)', lineHeight: 1.6, fontSize: '1.1rem' }}>{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
