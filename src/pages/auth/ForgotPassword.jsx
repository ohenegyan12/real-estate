import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { authService } from '../../services/api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 480);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await authService.forgotPassword(email);
            setSubmitted(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
            padding: isMobile ? '1rem' : '2rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background elements */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-10%',
                width: isMobile ? '250px' : '400px',
                height: isMobile ? '250px' : '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)',
            }} />

            <div style={{
                width: '100%',
                maxWidth: '450px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                padding: isMobile ? '2rem 1.5rem' : '3rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                position: 'relative',
                zIndex: 1
            }}>
                <Link to="/login" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--text-lighter)',
                    marginBottom: '2rem',
                    fontSize: '0.9rem'
                }}>
                    <ArrowLeft size={16} /> Back to Login
                </Link>

                {!submitted ? (
                    <>
                        <div style={{ marginBottom: '2.5rem' }}>
                            <h1 style={{ color: 'white', fontSize: '2rem', marginBottom: '0.75rem' }}>Forgot Password</h1>
                            <p style={{ color: 'var(--text-lighter)' }}>Enter your email address and we'll send you instructions to reset your password.</p>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {error && (
                                <div style={{
                                    padding: '0.9rem',
                                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                    borderRadius: '12px',
                                    color: '#f87171',
                                    fontSize: '0.85rem',
                                    textAlign: 'center'
                                }}>
                                    {error}
                                </div>
                            )}
                            <div style={{ position: 'relative' }}>
                                <label style={{ display: 'block', color: 'white', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                                    <input
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.85rem 1rem 0.85rem 3rem',
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: '12px',
                                            color: 'white',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            transition: 'all 0.3s ease'
                                        }}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn-accent"
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    marginTop: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem',
                                    opacity: loading ? 0.7 : 1,
                                    cursor: loading ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'} <Send size={18} />
                            </button>
                        </form>
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            color: 'var(--success)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 2rem'
                        }}>
                            <Send size={40} />
                        </div>
                        <h2 style={{ color: 'white', fontSize: '1.75rem', marginBottom: '1rem' }}>Check your email</h2>
                        <p style={{ color: 'var(--text-lighter)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                            We've sent password reset instructions to <br />
                            <strong style={{ color: 'white' }}>{email}</strong>
                        </p>
                        <button
                            onClick={() => setSubmitted(false)}
                            style={{ color: 'var(--accent)', fontWeight: '600' }}
                        >
                            Didn't receive the email? Try again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
