import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Search, Calendar, User, ArrowRight, ChevronRight, MessageSquare } from 'lucide-react';

const Blog = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const posts = [
        {
            category: "Buying Tips",
            title: "How to Buy a House with Low Income",
            date: "June 12, 2023",
            author: "John Doe",
            comments: 12,
            desc: "Discover the strategies and programs available to help low-income families achieve homeownership in Ghana's evolving market.",
            image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2670&auto=format&fit=crop"
        },
        {
            category: "Selling Guide",
            title: "10 Things to Consider Before Selling Your Property",
            date: "May 28, 2023",
            author: "Jane Smith",
            comments: 8,
            desc: "Planning to sell your home? Here are important factors to consider, from home repairs to market timing.",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
        },
        {
            category: "Market Trends",
            title: "The Rise of Smart Homes: Emerging Trends in Accra",
            date: "May 15, 2023",
            author: "Kwame Mensah",
            comments: 15,
            desc: "Explore the latest smart home technologies that are transforming luxury living and increasing property values.",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop"
        },
        {
            category: "Interior Design",
            title: "Modern Minimalist Aesthetics for Your New Home",
            date: "April 20, 2023",
            author: "Ama Serwaa",
            comments: 20,
            desc: "Learn how to achieve a high-end minimalist look in your apartment without spending a fortune on decor.",
            image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop"
        },
        {
            category: "Investment",
            title: "Why Real Estate is Ghana's Safest Investment in 2024",
            date: "March 10, 2023",
            author: "Kofi Boateng",
            comments: 5,
            desc: "A deep dive into why real estate continues to outperform other asset classes despite global economic shifts.",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2573&auto=format&fit=crop"
        },
        {
            category: "Neighborhood Focus",
            title: "Spotlight on Cantonments: Living in the Heart of Accra",
            date: "February 25, 2023",
            author: "Esi Amankwah",
            comments: 10,
            desc: "Discover why Cantonments remains the most sought-after neighborhood for expats and luxury home buyers.",
            image: "https://images.unsplash.com/photo-1590066877791-47c0e47af336?q=80&w=2670&auto=format&fit=crop"
        }
    ];

    return (
        <div style={{ backgroundColor: '#f8fafc' }}>
            <Navbar />

            {/* Hero Section */}
            <section style={{
                padding: '12rem 0 6rem',
                backgroundColor: 'var(--primary)',
                backgroundImage: 'linear-gradient(rgba(30, 41, 59, 0.8), rgba(30, 41, 59, 0.8)), url("https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2670&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                textAlign: 'center'
            }}>
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}
                    >
                        Our Blog & Insights
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}
                    >
                        Stay updated with the latest trends, guides, and news from the real estate world in Ghana.
                    </motion.p>
                </div>
            </section>

            {/* Blog Content */}
            <section style={{ padding: '5rem 0 8rem' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>

                    {/* Posts Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100%, 1fr))', gap: '3rem' }}>
                        {posts.map((post, idx) => (
                            <motion.article
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '32px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <div style={{ height: '350px', overflow: 'hidden', position: 'relative' }}>
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', backgroundColor: 'var(--accent)', color: 'white', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '700' }}>
                                        {post.category}
                                    </div>
                                </div>
                                <div style={{ padding: '2.5rem' }}>
                                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16} /> {post.date}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={16} /> By {post.author}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MessageSquare size={16} /> {post.comments} Comments</div>
                                    </div>
                                    <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1rem', fontFamily: 'var(--font-heading)', lineHeight: 1.3 }}>
                                        {post.title}
                                    </h2>
                                    <p style={{ color: 'var(--text-light)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '2rem' }}>
                                        {post.desc}
                                    </p>
                                    <button style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        color: 'var(--primary)',
                                        fontWeight: '800',
                                        border: 'none',
                                        background: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1rem'
                                    }}>
                                        Read Full Article <ArrowRight size={18} color="var(--accent)" />
                                    </button>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <aside>
                        {/* Search */}
                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '24px', marginBottom: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1.5rem' }}>Search Blog</h3>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    placeholder="Type here..."
                                    style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
                                />
                                <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
                            </div>
                        </div>

                        {/* Categories */}
                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '24px', marginBottom: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1.5rem' }}>Categories</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {['Buying Tips', 'Selling Guide', 'Market Trends', 'Interior Design', 'Investment'].map((cat, idx) => (
                                    <button key={idx} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '0.75rem 0',
                                        border: 'none',
                                        background: 'none',
                                        color: '#64748b',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #f1f5f9',
                                        textAlign: 'left'
                                    }}>
                                        {cat} <ChevronRight size={16} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div style={{ backgroundColor: 'var(--primary)', padding: '2.5rem', borderRadius: '24px', color: 'white' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>Never Miss a Post</h3>
                            <p style={{ opacity: 0.8, marginBottom: '1.5rem', lineHeight: 1.6 }}>Subscribe to our newsletter for weekly real estate insights.</p>
                            <input
                                type="email"
                                placeholder="Email address"
                                style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: 'none', marginBottom: '1rem', outline: 'none' }}
                            />
                            <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '12px', backgroundColor: 'var(--accent)', fontWeight: '700' }}>
                                Subscribe Now
                            </button>
                        </div>
                    </aside>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Blog;
