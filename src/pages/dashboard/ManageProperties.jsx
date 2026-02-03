import React, { useState, useEffect } from 'react';
import { propertyService, mediaService } from '../../services/api';
import {
    Search,
    Filter,
    Plus,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    MapPin,
    BedDouble,
    Bath,
    Square,
    ChevronLeft,
    ChevronRight,
    X,
    Upload,
    Check
} from 'lucide-react';

import Toast from '../../components/Toast';

const ManageProperties = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        type: 'Apartment',
        price: '',
        location: '',
        beds: 0,
        baths: 0,
        size: '',
        description: '',
        image: '',
        images: [],
        status: 'Active',
        hasPaymentPlan: false,
        agent: {
            name: '',
            role: 'Senior Agent',
            phone: '',
            email: '',
            image: 'https://images.unsplash.com/photo-1560250097-9b93dbd96cd8?q=80&w=250&auto=format&fit=crop'
        }
    });

    const COMMON_AMENITIES = [
        "Swimming Pool", "24/7 Security", "Backup Power", "Modern Kitchen",
        "Private Garden", "Gym", "Garage", "Air Conditioning", "Water Heater"
    ];

    const [customAmenity, setCustomAmenity] = useState('');

    const [properties, setProperties] = useState([]);
    const [newImageUrl, setNewImageUrl] = useState('');

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const data = await propertyService.getAll();
            setProperties(data);
        } catch (error) {
            console.error('Error fetching properties:', error);
            showToast('Failed to load properties', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAgentChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            agent: {
                ...prev.agent || {},
                [name]: value
            }
        }));
    };

    const handleAmenityToggle = (amenity) => {
        setFormData(prev => {
            const current = prev.amenities || [];
            if (current.includes(amenity)) {
                return { ...prev, amenities: current.filter(a => a !== amenity) };
            } else {
                return { ...prev, amenities: [...current, amenity] };
            }
        });
    };

    const addCustomAmenity = () => {
        if (!customAmenity) return;
        setFormData(prev => ({
            ...prev,
            amenities: [...(prev.amenities || []), customAmenity]
        }));
        setCustomAmenity('');
    };

    const addImage = () => {
        if (!newImageUrl) return;
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, newImageUrl],
            image: prev.images.length === 0 ? newImageUrl : prev.image
        }));
        setNewImageUrl('');
    };

    const removeImage = (index) => {
        setFormData(prev => {
            const newImages = prev.images.filter((_, i) => i !== index);
            return {
                ...prev,
                images: newImages,
                image: newImages.length > 0 ? newImages[0] : ''
            };
        });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const data = await mediaService.upload(file);
            if (data && data.url) {
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, data.url],
                    image: prev.images.length === 0 ? data.url : prev.image
                }));
                showToast('Image uploaded successfully');
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error('Upload failed:', error);
            showToast(`Failed to upload image: ${error.message}`, 'error');
        } finally {
            setUploading(false);
        }
    };

    const handleAddClick = () => {
        setIsEditing(false);
        setFormData({
            name: '',
            type: 'Apartment',
            price: '',
            location: '',
            beds: 0,
            baths: 0,
            size: '',
            description: '',
            image: '',
            images: [],
            status: 'Active',
            hasPaymentPlan: false,
            agent: {
                name: '',
                role: 'Senior Agent',
                phone: '',
                email: '',
                image: 'https://images.unsplash.com/photo-1560250097-9b93dbd96cd8?q=80&w=250&auto=format&fit=crop'
            }
        });
        setShowAddModal(true);
    };

    const handleEditClick = (prop) => {
        setIsEditing(true);
        setSelectedProperty(prop);
        setFormData({
            ...prop,
            amenities: prop.amenities || [],
            agent: prop.agent || {
                name: '',
                role: 'Senior Agent',
                phone: '',
                email: '',
                image: 'https://images.unsplash.com/photo-1560250097-9b93dbd96cd8?q=80&w=250&auto=format&fit=crop'
            }
        });
        setShowAddModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            try {
                await propertyService.delete(id);
                setProperties(properties.filter(p => p.id !== id));
                showToast('Property deleted successfully');
            } catch (error) {
                console.error('Error deleting property:', error);
                showToast('Failed to delete property', 'error');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                const updated = await propertyService.update(selectedProperty.id, formData);
                setProperties(properties.map(p => p.id === selectedProperty.id ? updated : p));
                showToast('Property updated successfully');
            } else {
                const created = await propertyService.create(formData);
                setProperties([created, ...properties]);
                showToast('Property added successfully');
            }
            setShowAddModal(false);
        } catch (error) {
            console.error('Error saving property:', error);
            showToast(`Failed to save property: ${error.message}`, 'error');
        }
    };

    const filteredProperties = properties.filter(prop =>
        (prop.name || prop.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (prop.location || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '0.5rem' }}>Manage Properties</h1>
                    <p style={{ color: '#64748b' }}>Total of {properties.length} properties listed in your catalog</p>
                </div>
                <button
                    onClick={handleAddClick}
                    className="btn-accent"
                    style={{ padding: '0.85rem 1.5rem', borderRadius: '14px', gap: '0.5rem', width: 'fit-content' }}
                >
                    <Plus size={20} /> Add New Property
                </button>
            </div>

            {/* Filters & Actions */}
            <div className="admin-card mobile-stack" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1.5rem',
                padding: '1rem'
            }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                        type="text"
                        placeholder="Search for properties..."
                        className="admin-input"
                        style={{ paddingLeft: '2.8rem' }}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="admin-input" style={{
                        width: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#64748b',
                        backgroundColor: 'white'
                    }}>
                        <Filter size={18} /> Filters
                    </button>
                    <select className="admin-input" style={{
                        width: 'auto',
                        color: '#64748b',
                        backgroundColor: 'white'
                    }}>
                        <option>Sort by: Newest</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* Property List */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '2rem'
            }}>
                {filteredProperties.map((prop) => (
                    <div key={prop.id} className="admin-card admin-card-hover" style={{
                        overflow: 'hidden',
                        padding: 0,
                        position: 'relative'
                    }}>
                        <div style={{ position: 'relative', height: '200px' }}>
                            <img src={prop.image || 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2592&auto=format&fit=crop'} alt={prop.name || prop.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div className={`status-badge ${prop.status === 'Active' || prop.status === 'For Sale' ? 'status-active' : prop.status === 'Pending' ? 'status-pending' : 'status-sold'}`}
                                style={{ position: 'absolute', top: '1rem', left: '1rem', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
                                {prop.status || 'Active'}
                            </div>
                            <button style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                width: '32px',
                                height: '32px',
                                borderRadius: '8px',
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#1a1a1a',
                            }}>
                                <MoreVertical size={16} />
                            </button>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{prop.type || 'Property'}</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: '800' }}>{prop.price}</div>
                            </div>
                            <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.25rem' }}>{prop.name || prop.title}</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
                                <MapPin size={12} /> {prop.location}
                            </div>

                            <div style={{
                                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                                padding: '1rem 0',
                                borderTop: '1px solid #f1f5f9',
                                borderBottom: '1px solid #f1f5f9',
                                marginBottom: '1.25rem',
                                gap: '0.5rem'
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: '700' }}><BedDouble size={14} /> {prop.beds || 0}</div>
                                    <div style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase' }}>Beds</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: '700' }}><Bath size={14} /> {prop.baths || 0}</div>
                                    <div style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase' }}>Baths</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: '700' }}><Square size={14} /> {(prop.size || prop.area || '0')?.toString().split(' ')[0]}</div>
                                    <div style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase' }}>Sqft</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button
                                    onClick={() => handleEditClick(prop)}
                                    style={{
                                        flex: 1,
                                        padding: '0.6rem',
                                        borderRadius: '10px',
                                        backgroundColor: '#f8fafc',
                                        color: 'var(--text-main)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.85rem',
                                        fontWeight: '700'
                                    }}
                                >
                                    <Edit size={14} /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(prop.id)}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '10px',
                                        backgroundColor: 'rgba(239, 68, 68, 0.05)',
                                        color: 'var(--error)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Placeholder */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button style={{ width: '40px', height: '40px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}><ChevronLeft size={20} /></button>
                    <button style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>1</button>
                    <button style={{ width: '40px', height: '40px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', fontWeight: '600' }}>2</button>
                    <button style={{ width: '40px', height: '40px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', fontWeight: '600' }}>3</button>
                    <button style={{ width: '40px', height: '40px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}><ChevronRight size={20} /></button>
                </div>
            </div>

            {/* Add Property Modal Placeholder */}
            {showAddModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: isMobile ? '0' : '2rem'
                }}>
                    <div className="admin-card" style={{
                        width: '100%',
                        maxWidth: '850px',
                        height: isMobile ? '100%' : 'auto',
                        maxHeight: isMobile ? '100vh' : '90vh',
                        borderRadius: isMobile ? '0' : '20px',
                        overflowY: 'auto',
                        padding: '0',
                        position: 'relative',
                        border: 'none',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}>
                        {/* Modal Header */}
                        <div style={{
                            padding: '1rem 1.5rem',
                            borderBottom: '1px solid #f1f5f9',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            position: 'sticky',
                            top: 0,
                            backgroundColor: 'white',
                            zIndex: 10
                        }}>
                            <div>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)' }}>{isEditing ? 'Edit Property' : 'Add New Property'}</h2>
                                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>{isEditing ? 'Update the details' : 'List a new property'}</p>
                            </div>
                            <button
                                onClick={() => setShowAddModal(false)}
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '10px',
                                    backgroundColor: '#f8fafc',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#64748b'
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form style={{ padding: isMobile ? '1.5rem' : '2rem' }} onSubmit={handleSubmit}>
                            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '2rem' }}>
                                {/* Left Column: Basic Info */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Basic Information</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                            <div>
                                                <label className="admin-label">Property Title</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g. Modern Luxury Villa"
                                                    className="admin-input"
                                                />
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                <div>
                                                    <label className="admin-label">Type</label>
                                                    <select
                                                        name="type"
                                                        value={formData.type}
                                                        onChange={handleInputChange}
                                                        className="admin-input"
                                                    >
                                                        <option>Apartment</option>
                                                        <option>Villa</option>
                                                        <option>Office</option>
                                                        <option>Penthouse</option>
                                                        <option>House</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="admin-label">Price (GH₵)</label>
                                                    <input
                                                        type="text"
                                                        name="price"
                                                        value={formData.price}
                                                        onChange={handleInputChange}
                                                        placeholder="500,000"
                                                        className="admin-input"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="admin-label">Location Address</label>
                                                <div style={{ position: 'relative' }}>
                                                    <MapPin size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                                    <input
                                                        type="text"
                                                        name="location"
                                                        value={formData.location}
                                                        onChange={handleInputChange}
                                                        placeholder="East Legon, Accra"
                                                        className="admin-input"
                                                        style={{ paddingLeft: '2.8rem' }}
                                                    />
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem' }}>
                                                    <input
                                                        type="checkbox"
                                                        id="hasPaymentPlan"
                                                        name="hasPaymentPlan"
                                                        checked={formData.hasPaymentPlan}
                                                        onChange={handleInputChange}
                                                        style={{ width: '18px', height: '18px', accentColor: 'var(--accent)' }}
                                                    />
                                                    <label htmlFor="hasPaymentPlan" style={{ fontWeight: '600', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.9rem' }}>Enable 50/50 Payment Plan</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Property Features</h3>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                                            <div>
                                                <label className="admin-label">Beds</label>
                                                <input
                                                    type="number"
                                                    name="beds"
                                                    value={formData.beds}
                                                    onChange={handleInputChange}
                                                    className="admin-input"
                                                />
                                            </div>
                                            <div>
                                                <label className="admin-label">Baths</label>
                                                <input
                                                    type="number"
                                                    name="baths"
                                                    value={formData.baths}
                                                    onChange={handleInputChange}
                                                    className="admin-input"
                                                />
                                            </div>
                                            <div>
                                                <label className="admin-label">Area (sqft)</label>
                                                <input
                                                    type="text"
                                                    name="size"
                                                    value={formData.size}
                                                    onChange={handleInputChange}
                                                    className="admin-input"
                                                    placeholder="2400"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Amenities</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                                        {COMMON_AMENITIES.map(item => (
                                            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                                                <input
                                                    type="checkbox"
                                                    id={`amenity-${item}`}
                                                    checked={(formData.amenities || []).includes(item)}
                                                    onChange={() => handleAmenityToggle(item)}
                                                    style={{ width: '16px', height: '16px', accentColor: 'var(--accent)' }}
                                                />
                                                <label htmlFor={`amenity-${item}`} style={{ cursor: 'pointer', color: '#475569' }}>{item}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <input
                                            type="text"
                                            placeholder="Add custom amenity..."
                                            value={customAmenity}
                                            onChange={(e) => setCustomAmenity(e.target.value)}
                                            className="admin-input"
                                            style={{ fontSize: '0.85rem' }}
                                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomAmenity(); } }}
                                        />
                                        <button
                                            type="button"
                                            onClick={addCustomAmenity}
                                            style={{ padding: '0 1rem', borderRadius: '12px', backgroundColor: '#f1f5f9', color: '#64748b', fontWeight: '600', border: 'none', fontSize: '0.8rem' }}
                                        >
                                            Add
                                        </button>
                                    </div>
                                    {(formData.amenities || []).filter(a => !COMMON_AMENITIES.includes(a)).length > 0 && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
                                            {(formData.amenities || []).filter(a => !COMMON_AMENITIES.includes(a)).map((item, idx) => (
                                                <span key={idx} style={{ padding: '0.25rem 0.75rem', backgroundColor: '#e2e8f0', borderRadius: '50px', fontSize: '0.8rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    {item}
                                                    <button type="button" onClick={() => handleAmenityToggle(item)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, display: 'flex' }}><X size={12} /></button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Column: Media & Description */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Media & Description</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                        <div>
                                            <label className="admin-label">Description</label>
                                            <textarea
                                                rows="4"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                placeholder="Describe the key features and amenities..."
                                                className="admin-input"
                                                style={{ height: 'auto', resize: 'none' }}
                                            ></textarea>
                                        </div>
                                        <div>
                                            <label className="admin-label">Property Gallery</label>

                                            {/* Dropzone Style Upload */}
                                            <div
                                                onClick={() => document.getElementById('fileUpload').click()}
                                                style={{
                                                    border: '2px dashed #cbd5e1',
                                                    borderRadius: '16px',
                                                    padding: '2rem',
                                                    textAlign: 'center',
                                                    backgroundColor: '#f8fafc',
                                                    cursor: uploading ? 'not-allowed' : 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    marginBottom: '1.5rem',
                                                    opacity: uploading ? 0.6 : 1
                                                }}
                                                onMouseOver={(e) => !uploading && (e.currentTarget.style.borderColor = 'var(--accent)')}
                                                onMouseOut={(e) => !uploading && (e.currentTarget.style.borderColor = '#cbd5e1')}
                                            >
                                                <input
                                                    type="file"
                                                    id="fileUpload"
                                                    hidden
                                                    accept="image/*"
                                                    onChange={handleFileUpload}
                                                    disabled={uploading}
                                                />
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                                                    <div style={{
                                                        width: '48px',
                                                        height: '48px',
                                                        borderRadius: '50%',
                                                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                                                        color: 'var(--accent)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        {uploading ? (
                                                            <div className="spinner" style={{ width: '24px', height: '24px', border: '3px solid rgba(37,99,235,0.1)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                                                        ) : (
                                                            <Upload size={24} />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '0.95rem' }}>
                                                            {uploading ? 'Uploading Image...' : 'Click to upload or drag and drop'}
                                                        </div>
                                                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
                                                            PNG, JPG or WEBP (Max. 5MB)
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                            {/* Gallery Preview */}
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                                                gap: '0.75rem',
                                                padding: '1rem',
                                                backgroundColor: '#f8fafc',
                                                borderRadius: '16px',
                                                border: '1px solid #e2e8f0'
                                            }}>
                                                {formData.images?.map((url, idx) => (
                                                    <div key={idx} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', height: '80px', border: '2px solid white', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                                                        <img src={url} alt={`Property ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(idx)}
                                                            style={{ position: 'absolute', top: '2px', right: '2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.9)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '10px' }}
                                                        >
                                                            <X size={12} />
                                                        </button>
                                                    </div>
                                                ))}
                                                {formData.images?.length === 0 && (
                                                    <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem', padding: '1.5rem' }}>
                                                        No images added yet. Click above to upload.
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Agent Contact</h3>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                <div>
                                                    <label className="admin-label">Agent Phone Number</label>
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        value={formData.agent?.phone || ''}
                                                        onChange={handleAgentChange}
                                                        placeholder="055..."
                                                        className="admin-input"
                                                    />
                                                    <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>
                                                        This number will be used for the "Contact Agent" button.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <style>{`
                                                @keyframes spin {
                                                    to { transform: rotate(360deg); }
                                                }
                                            `}</style>
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div style={{
                                marginTop: '2.5rem',
                                paddingTop: '1.5rem',
                                borderBottom: isMobile ? '1.5rem solid transparent' : 'none',
                                borderTop: '1px solid #f1f5f9',
                                display: 'flex',
                                flexDirection: isMobile ? 'column-reverse' : 'row',
                                justifyContent: 'flex-end',
                                gap: '1rem'
                            }}>
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    style={{ padding: '1rem 1.5rem', borderRadius: '12px', fontWeight: '600', color: '#64748b', backgroundColor: isMobile ? '#f8fafc' : 'transparent' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-accent"
                                    style={{ padding: '1rem 2rem', borderRadius: '12px', gap: '0.5rem', justifyContent: 'center' }}
                                >
                                    {isEditing ? 'Save Changes' : 'Publish Property'} <Check size={18} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
        </div>
    );
};

export default ManageProperties;
