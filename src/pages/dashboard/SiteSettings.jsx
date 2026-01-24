import React, { useState, useEffect } from 'react';
import { settingsService } from '../../services/api';
import { Save, Globe, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, Check } from 'lucide-react';

const SiteSettings = () => {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState({
        stats: { yearsExperience: '', propertiesListed: '', happyClients: '', awardsWon: '' },
        contact: { phone: '', email: '', address: '' },
        social: { facebook: '', instagram: '', twitter: '', linkedin: '' }
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await settingsService.get();
                setSettings(prev => ({
                    stats: { ...prev.stats, ...data.stats },
                    contact: { ...prev.contact, ...data.contact },
                    social: { ...prev.social, ...data.social }
                }));
            } catch (error) {
                console.error('Error fetching settings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async (e) => {
        if (e) e.preventDefault();
        try {
            await settingsService.update(settings);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    };

    const handleChange = (section, field, value) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading settings...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '0.5rem' }}>Site Settings</h1>
                    <p style={{ color: '#64748b' }}>Manage your website's contact information, stats, and social media.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="btn-accent"
                    style={{ padding: '0.85rem 1.75rem', borderRadius: '14px', gap: '0.5rem', width: 'fit-content' }}
                >
                    <Save size={18} /> {success ? 'Saved!' : 'Save Changes'}
                </button>
            </div>

            {success && (
                <div style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    color: 'var(--success)',
                    padding: '1rem 1.5rem',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontWeight: '600'
                }}>
                    <Check size={20} /> Settings updated successfully!
                </div>
            )}

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Stats Section */}
                <section className="admin-card">
                    <h2 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Globe size={20} color="var(--accent)" /> Homepage Statistics
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label className="admin-label">Years of Experience</label>
                            <input
                                type="text"
                                value={settings.stats.yearsExperience}
                                onChange={(e) => handleChange('stats', 'yearsExperience', e.target.value)}
                                className="admin-input"
                            />
                        </div>
                        <div>
                            <label className="admin-label">Properties Listed</label>
                            <input
                                type="text"
                                value={settings.stats.propertiesListed}
                                onChange={(e) => handleChange('stats', 'propertiesListed', e.target.value)}
                                className="admin-input"
                            />
                        </div>
                        <div>
                            <label className="admin-label">Happy Clients</label>
                            <input
                                type="text"
                                value={settings.stats.happyClients}
                                onChange={(e) => handleChange('stats', 'happyClients', e.target.value)}
                                className="admin-input"
                            />
                        </div>
                        <div>
                            <label className="admin-label">Awards Won</label>
                            <input
                                type="text"
                                value={settings.stats.awardsWon}
                                onChange={(e) => handleChange('stats', 'awardsWon', e.target.value)}
                                className="admin-input"
                            />
                        </div>
                    </div>
                </section>

                {/* Contact Information */}
                <section className="admin-card">
                    <h2 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Phone size={20} color="var(--accent)" /> Contact Information
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="mobile-stack">
                        <div>
                            <label className="admin-label">Phone Number</label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="text"
                                    value={settings.contact.phone}
                                    onChange={(e) => handleChange('contact', 'phone', e.target.value)}
                                    className="admin-input"
                                    style={{ paddingLeft: '2.8rem' }}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="admin-label">Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="email"
                                    value={settings.contact.email}
                                    onChange={(e) => handleChange('contact', 'email', e.target.value)}
                                    className="admin-input"
                                    style={{ paddingLeft: '2.8rem' }}
                                />
                            </div>
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label className="admin-label">Office Address</label>
                            <div style={{ position: 'relative' }}>
                                <MapPin size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="text"
                                    value={settings.contact.address}
                                    onChange={(e) => handleChange('contact', 'address', e.target.value)}
                                    className="admin-input"
                                    style={{ paddingLeft: '2.8rem' }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Social Media */}
                <section className="admin-card">
                    <h2 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1.5rem' }}>Social Media Links</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <SocialInput
                            icon={Facebook}
                            label="Facebook"
                            value={settings.social.facebook}
                            onChange={(val) => handleChange('social', 'facebook', val)}
                            color="#1877F2"
                        />
                        <SocialInput
                            icon={Instagram}
                            label="Instagram"
                            value={settings.social.instagram}
                            onChange={(val) => handleChange('social', 'instagram', val)}
                            color="#E4405F"
                        />
                        <SocialInput
                            icon={Twitter}
                            label="Twitter / X"
                            value={settings.social.twitter}
                            onChange={(val) => handleChange('social', 'twitter', val)}
                            color="#000000"
                        />
                        <SocialInput
                            icon={Linkedin}
                            label="LinkedIn"
                            value={settings.social.linkedin}
                            onChange={(val) => handleChange('social', 'linkedin', val)}
                            color="#0A66C2"
                        />
                    </div>
                </section>
            </form>
        </div>
    );
};

const SocialInput = ({ icon: Icon, label, value, color, onChange }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="mobile-stack">
        <div style={{ width: '120px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Icon size={20} style={{ color }} />
            <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{label}</span>
        </div>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="admin-input"
            style={{ flex: 1 }}
        />
    </div>
);

export default SiteSettings;
