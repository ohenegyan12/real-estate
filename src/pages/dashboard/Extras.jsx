import React from 'react';

const PlaceholderPage = ({ title }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '0.5rem' }}>{title}</h1>
            <p style={{ color: '#64748b' }}>This section is currently under development.</p>
        </div>
        <div style={{
            backgroundColor: 'white',
            padding: '4rem',
            borderRadius: '24px',
            border: '1px solid #e2e8f0',
            textAlign: 'center',
            color: '#94a3b8'
        }}>
            <p>Coming Soon</p>
        </div>
    </div>
);

export const Messages = () => <PlaceholderPage title="Inquiries & Messages" />;
export const Media = () => <PlaceholderPage title="Media Library" />;
export const Users = () => <PlaceholderPage title="User Management" />;
