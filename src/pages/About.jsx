import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users, Target, Rocket } from 'lucide-react';

const About = () => {
    const stats = [
        { label: 'Properties Sold', value: '1.2K+', icon: <Award size={24} /> },
        { label: 'Happy Clients', value: '4.8K+', icon: <Users size={24} /> },
        { label: 'Market Experience', value: '15+', icon: <Rocket size={24} /> },
        { label: 'Awards Won', value: '25+', icon: <Target size={24} /> },
    ];

    const team = [
        {
            name: "Kwame Mensah",
            role: "Founder & CEO",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"
        },
        {
            name: "Ama Serwaa",
            role: "Head of Real Estate",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop"
        },
        {
            name: "Kofi Boateng",
            role: "Senior Property Consultant",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2570&auto=format&fit=crop"
        },
        {
            name: "Esi Amankwah",
            role: "Customer Relations",
            image: "https://images.unsplash.com/photo-1567532939103-c053bb14b2b9?q=80&w=2574&auto=format&fit=crop"
        }
    ];

    return (
        <div style={{ backgroundColor: '#f8fafc' }}>
            <Navbar />

            {/* Hero Section */}
            <section style={{
                padding: '12rem 0 8rem',
                backgroundColor: 'var(--primary)',
                backgroundImage: 'linear-gradient(rgba(30, 41, 59, 0.8), rgba(30, 41, 59, 0.8)), url("https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2670&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                textAlign: 'center'
            }}>
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
                        style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}
                    >
                        Redefining Living Spaces <br /> in Ghana
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}
                    >
                        We are more than just a real estate company. We are a team of dedicated professionals committed to helping you find the place you'll call home.
                    </motion.p>
                </div>
            </section>

            {/* Our Mission & Vision */}
            <section style={{ padding: '8rem 0' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2500&auto=format&fit=crop"
                            alt="About Us"
                            style={{ width: '100%', borderRadius: '32px', boxShadow: '0 30px 60px -12px rgba(0,0,0,0.2)' }}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span style={{ color: 'var(--accent)', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>WHO WE ARE</span>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin: '1rem 0 1.5rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
                            We Build Memories, Not Just Houses
                        </h2>
                        <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                            Founded in 2010, Elite Living has grown from a small consultancy to one of Ghana's leading luxury real estate firms. Our journey began with a simple mission: to make premium living accessible and transparent.
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
            <section style={{ padding: '6rem 0', backgroundColor: 'var(--primary)', color: 'white' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
                        {stats.map((stat, idx) => (
                            <div key={idx} style={{ textAlign: 'center' }}>
                                <div style={{ color: 'var(--accent)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
                                <div style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '0.5rem' }}>{stat.value}</div>
                                <div style={{ opacity: 0.8, fontSize: '1rem' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Team */}
            <section style={{ padding: '8rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span style={{ color: 'var(--accent)', fontWeight: '700', letterSpacing: '1px' }}>OUR EXPERTS</span>
                        <h2 style={{ fontSize: '3rem', color: 'var(--primary)', fontWeight: '800', fontFamily: 'var(--font-heading)', marginTop: '0.5rem' }}>Meet Our Team</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2.5rem' }}>
                        {team.map((member, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                    textAlign: 'center',
                                    paddingBottom: '2rem'
                                }}
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    style={{ width: '100%', height: '300px', objectFit: 'cover', marginBottom: '1.5rem' }}
                                />
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.25rem' }}>{member.name}</h3>
                                <p style={{ color: 'var(--accent)', fontWeight: '600', fontSize: '0.9rem' }}>{member.role}</p>
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
