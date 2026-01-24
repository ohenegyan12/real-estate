import React, { useState, useEffect } from 'react';
import { inquiryService } from '../../services/api';
import { Mail, Phone, Calendar, User, MessageSquare, Search, Filter, MoreVertical, Trash2, Eye } from 'lucide-react';

const Inquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const data = await inquiryService.getAll();
                setInquiries(data);
            } catch (error) {
                console.error('Error fetching inquiries:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchInquiries();
    }, []);

    const filteredInquiries = inquiries.filter(inq =>
        (inq.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (inq.propertyName || inq.propertyTitle || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (inq.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div style={{ padding: '2rem' }}>Loading inquiries...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="mobile-stack">
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '0.5rem' }}>Property Inquiries</h1>
                    <p style={{ color: '#64748b' }}>Manage and respond to potential buyer inquiries.</p>
                </div>
            </div>

            {/* Filters / Search */}
            <div className="admin-card mobile-stack" style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1.25rem' }}>
                <div style={{ position: 'relative', flex: 1, width: '100%' }}>
                    <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, email, or property..."
                        className="admin-input"
                        style={{ paddingLeft: '2.8rem', width: '100%' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="btn-secondary" style={{ padding: '0.75rem 1.25rem', gap: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                    <Filter size={18} /> Filter
                </button>
            </div>

            {/* Inquiries Table */}
            <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8fafc', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
                                <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Inquirer</th>
                                <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Property</th>
                                <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Message</th>
                                <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Date</th>
                                <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Status</th>
                                <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInquiries.map((inq) => (
                                <tr key={inq.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontWeight: '700', color: '#1a1a1a' }}>{inq.name}</span>
                                            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{inq.email}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{inq.propertyName}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem', maxWidth: '300px' }}>
                                        <span style={{ fontSize: '0.85rem', color: '#64748b', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {inq.message}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', color: '#64748b' }}>
                                        {new Date(inq.date).toLocaleDateString()}
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <span className={`status-badge ${inq.status === 'New' ? 'status-active' : 'status-pending'}`} style={{ fontSize: '0.7rem' }}>
                                            {inq.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                            <button className="action-btn" title="View Details"><Eye size={16} /></button>
                                            <button className="action-btn" title="Delete" style={{ color: '#ef4444' }}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Inquiries;
