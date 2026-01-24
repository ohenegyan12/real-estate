import React, { useState, useEffect } from 'react';
import { MapPin, Search, Mail, Phone } from 'lucide-react';
import { settingsService } from '../services/api';

const Footer = () => {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await settingsService.get();
                setSettings(data);
            } catch (error) {
                console.error('Error fetching settings for footer:', error);
            }
        };
        fetchSettings();
    }, []);

    return (
        <footer style={{ backgroundColor: '#111', color: 'white', padding: '5rem 0' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem' }}>
                <div style={{ flex: '1 1 300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--accent)' }}>
                        <img src="/logo.jpeg" alt="Owusu Homes Logo" style={{ height: '32px', width: '32px', objectFit: 'cover', borderRadius: '50%' }} />
                        <span>Owusu Homes</span>
                    </div>
                    <p style={{ color: '#aaa', lineHeight: 1.8 }}>
                        Your gateway to exceptional living. We connect you with the most desired real estate properties and investment opportunities.
                    </p>
                </div>

                <div style={{ flex: '1 1 150px' }}>
                    <h4 style={{ marginBottom: '1.5rem', color: 'white', fontSize: '1.2rem' }}>Quick Links</h4>
                    <ul style={{ listStyle: 'none', color: '#aaa', padding: 0 }}>
                        <li style={{ marginBottom: '0.8rem' }}><a href="/" className="hover-text-accent">Home</a></li>
                        <li style={{ marginBottom: '0.8rem' }}><a href="/properties" className="hover-text-accent">Properties</a></li>
                        <li style={{ marginBottom: '0.8rem' }}><a href="/agents" className="hover-text-accent">Agents</a></li>
                        <li style={{ marginBottom: '0.8rem' }}><a href="/about" className="hover-text-accent">About Us</a></li>
                    </ul>
                </div>

                <div style={{ flex: '1 1 250px' }}>
                    <h4 style={{ marginBottom: '1.5rem', color: 'white', fontSize: '1.2rem' }}>Contact Us</h4>
                    <ul style={{ listStyle: 'none', color: '#aaa', padding: 0 }}>
                        <li style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                            <MapPin size={20} color="var(--accent)" />
                            <span>{settings?.contact?.address || 'East Legon, Accra, Ghana'}</span>
                        </li>
                        <li style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                            <Phone size={20} color="var(--accent)" />
                            <span>{settings?.contact?.phone || '+233 55 336 4848'}</span>
                        </li>
                        <li style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                            <Mail size={20} color="var(--accent)" />
                            <span>{settings?.contact?.email || 'owusuhomesgh@gmail.com'}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #333', textAlign: 'center', color: '#666' }}>
                &copy; {new Date().getFullYear()} Owusu Homes. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
