import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { inquiryService } from '../services/api';

const Contact = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = React.useState({ loading: false, success: false, error: null });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });
        try {
            await inquiryService.create(formData);
            setStatus({ loading: false, success: true, error: null });
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
        } catch (err) {
            console.error('Error submitting inquiry:', err);
            setStatus({ loading: false, success: false, error: 'Failed to send message. Please try again.' });
        }
    };

    const contactInfo = [
        {
            icon: <Phone size={24} />,
            title: "Phone Number",
            details: ["+233 55 336 4848", "+233 24 123 4567"],
            color: "#eff6ff"
        },
        {
            icon: <Mail size={24} />,
            title: "Email Address",
            details: ["owusuhomesgh@gmail.com", "support@owusuhomes.com"],
            color: "#fff7ed"
        },
        {
            icon: <MapPin size={24} />,
            title: "Office Location",
            details: ["East Legon, Accra", "Ghana, West Africa"],
            color: "#f0fdf4"
        }
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
                    backgroundImage: 'linear-gradient(rgba(30, 41, 59, 0.8), rgba(30, 41, 59, 0.8)), url("https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2670&auto=format&fit=crop")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                    textAlign: 'center'
                }}
            >
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '1rem', fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}
                    >
                        Get In Touch
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}
                    >
                        Have questions? We're here to help you find your dream property. Reach out to our experts today.
                    </motion.p>
                </div>
            </section>

            <section style={{ marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }} className="grid-cols-1-mobile">
                        {contactInfo.map((info, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                style={{
                                    backgroundColor: 'white',
                                    padding: '3rem 2rem',
                                    borderRadius: '32px',
                                    textAlign: 'center',
                                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)'
                                }}
                            >
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '20px',
                                    backgroundColor: info.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1.5rem',
                                    color: 'var(--accent)'
                                }}>
                                    {info.icon}
                                </div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1rem' }}>{info.title}</h3>
                                {info.details.map((line, i) => (
                                    <div key={i} style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{line}</div>
                                ))}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form and Map */}
            <section className="section-padding">
                <style>{`
                    .contact-grid {
                        display: grid;
                        grid-template-columns: 2fr 1fr;
                        gap: 4rem;
                    }
                    .contact-form-row {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 1.5rem;
                    }
                    .contact-info-card {
                        background-color: white;
                        padding: 3rem;
                        border-radius: 32px;
                        box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05);
                        height: 100%;
                    }
                    @media (max-width: 992px) {
                        .contact-grid {
                            grid-template-columns: 1fr;
                            gap: 3rem;
                        }
                    }
                    @media (max-width: 768px) {
                        .contact-form-row {
                            grid-template-columns: 1fr;
                        }
                        .contact-info-card {
                            padding: 1.5rem;
                        }
                    }
                `}</style>
                <div className="container contact-grid">

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: '800', color: 'var(--primary)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}>
                            Send Us a Message
                        </h2>
                        <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                            Fill out the form below and one of our property consultants will reach out to you within 24 hours.
                        </p>

                        {status.success && (
                            <div style={{ backgroundColor: '#ecfdf5', color: '#059669', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', fontWeight: '700' }}>
                                Thank you! Your message has been sent successfully.
                            </div>
                        )}
                        {status.error && (
                            <div style={{ backgroundColor: '#fef2f2', color: '#dc2626', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', fontWeight: '700' }}>
                                {status.error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="contact-form-row">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '0.9rem' }}>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="John Doe"
                                        style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '0.9rem' }}>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="john@example.com"
                                        style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '0.9rem' }}>Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Inquiry about property"
                                    style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '0.9rem' }}>Message</label>
                                <textarea
                                    rows="5"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="How can we help you?"
                                    style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', resize: 'none' }}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={status.loading}
                                className="btn btn-primary"
                                style={{ padding: '1.25rem', borderRadius: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', opacity: status.loading ? 0.7 : 1 }}
                            >
                                <Send size={20} /> {status.loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </motion.div>

                    {/* Side Info & Socials */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="contact-info-card">
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '2rem' }}>Corporate Office</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                    <div style={{ color: 'var(--accent)' }}><Clock size={24} /></div>
                                    <div>
                                        <div style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '1.1rem' }}>Business Hours</div>
                                        <div style={{ color: '#64748b', fontSize: '1rem' }}>Monday - Friday: 9am - 6pm</div>
                                        <div style={{ color: '#64748b', fontSize: '1rem' }}>Saturday: 10am - 4pm</div>
                                    </div>
                                </div>

                                <div style={{ paddingTop: '2rem', borderTop: '1px solid #f1f5f9' }}>
                                    <h4 style={{ fontWeight: '800', color: 'var(--primary)', marginBottom: '1.5rem' }}>Follow Our Socials</h4>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        {[<Facebook />, <Twitter />, <Instagram />, <Linkedin />].map((icon, i) => (
                                            <button key={i} style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '12px',
                                                border: '1px solid #e2e8f0',
                                                backgroundColor: 'white',
                                                color: 'var(--primary)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#eff6ff'}
                                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                            >
                                                {icon}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Map Placeholder */}
                                <div style={{
                                    marginTop: '2rem',
                                    height: '250px',
                                    backgroundColor: '#f1f5f9',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}>
                                    <img
                                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2674&auto=format&fit=crop"
                                        alt="Map"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
                                    />
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                        <MapPin size={40} color="#ef4444" fill="white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
