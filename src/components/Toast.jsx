import React, { useEffect } from 'react';
import { Check, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

    const isSuccess = type === 'success';

    return (
        <div style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            backgroundColor: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            zIndex: 9999,
            borderLeft: `4px solid ${isSuccess ? '#10b981' : '#ef4444'}`,
            animation: 'slideIn 0.3s ease-out',
            minWidth: '300px'
        }}>
            <div style={{
                color: isSuccess ? '#10b981' : '#ef4444',
                display: 'flex',
                alignItems: 'center'
            }}>
                {isSuccess ? <Check size={20} /> : <AlertCircle size={20} />}
            </div>
            <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '2px' }}>
                    {isSuccess ? 'Success' : 'Error'}
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                    {message}
                </p>
            </div>
            <button
                onClick={onClose}
                style={{
                    color: '#94a3b8',
                    padding: '4px',
                    marginRight: '-8px',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer'
                }}
            >
                <X size={16} />
            </button>
            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default Toast;
