import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Home,
    Settings,
    Users,
    MessageSquare,
    Image,
    LogOut,
    Menu,
    X,
    Search,
    Bell,
    ChevronDown,
    PlusCircle
} from 'lucide-react';

const SidebarLink = ({ to, icon: Icon, label, active, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem 1.5rem',
            color: active ? 'white' : 'rgba(255, 255, 255, 0.6)',
            backgroundColor: active ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
            borderRight: active ? '3px solid var(--accent)' : 'none',
            fontSize: '0.95rem',
            fontWeight: active ? '600' : '400',
            transition: 'all 0.3s ease',
            textDecoration: 'none'
        }}
    >
        <Icon size={20} color={active ? 'var(--accent)' : 'currentColor'} />
        <span>{label}</span>
    </Link>
);

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const location = useLocation();
    const pathname = location.pathname;

    React.useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 1024;
            setIsMobile(mobile);
            if (!mobile) setIsSidebarOpen(true);
            else setIsSidebarOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebarOnMobile = () => {
        if (isMobile) setIsSidebarOpen(false);
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', position: 'relative' }}>
            {/* Mobile Sidebar Overlay */}
            {isMobile && isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 95,
                        backdropFilter: 'blur(4px)'
                    }}
                />
            )}

            {/* Sidebar */}
            <aside style={{
                width: isSidebarOpen ? '280px' : '0',
                backgroundColor: '#1a1a1a',
                color: 'white',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: isMobile ? 'absolute' : 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                height: '100vh',
                zIndex: 100,
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: isMobile && isSidebarOpen ? '20px 0 50px rgba(0,0,0,0.3)' : 'none'
            }}>
                <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src="/logo.jpeg" alt="Logo" style={{ height: '40px', width: '40px', borderRadius: '50%' }} />
                        <span style={{ fontSize: '1.25rem', fontWeight: '800' }}>Owusu <span style={{ color: 'var(--accent)' }}>Homes</span></span>
                    </Link>
                    {isMobile && (
                        <button onClick={() => setIsSidebarOpen(false)} style={{ color: 'white' }}>
                            <X size={24} />
                        </button>
                    )}
                </div>

                <nav style={{ padding: '2rem 0', flex: 1, overflowY: 'auto' }}>
                    <SidebarLink to="/admin" icon={LayoutDashboard} label="Dashboard" active={pathname === '/admin'} onClick={closeSidebarOnMobile} />
                    <SidebarLink to="/admin/properties" icon={Home} label="Manage Properties" active={pathname === '/admin/properties'} onClick={closeSidebarOnMobile} />
                    <SidebarLink to="/admin/inquiries" icon={MessageSquare} label="Inquiries" active={pathname === '/admin/inquiries'} onClick={closeSidebarOnMobile} />
                    <SidebarLink to="/admin/settings" icon={Settings} label="Site Settings" active={pathname === '/admin/settings'} onClick={closeSidebarOnMobile} />
                </nav>

                <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', flexShrink: 0 }}>
                    <Link to="/login" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        color: 'rgba(255, 255, 255, 0.6)',
                        padding: '1rem',
                        fontSize: '0.95rem'
                    }}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{
                flex: 1,
                marginLeft: isMobile ? '0' : (isSidebarOpen ? '280px' : '0'),
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                minWidth: 0,
                backgroundColor: 'var(--bg-admin)'
            }}>
                {/* Header */}
                <header style={{
                    height: '70px',
                    backgroundColor: 'white',
                    borderBottom: '1px solid var(--card-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: isMobile ? '0 1rem' : '0 2rem',
                    position: 'sticky',
                    top: 0,
                    zIndex: 90
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button onClick={toggleSidebar} style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f8fafc',
                            color: '#64748b'
                        }}>
                            {isSidebarOpen && !isMobile ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <div style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: '500' }} className="mobile-hide">
                            Admin <span style={{ margin: '0 0.5rem' }}>/</span>
                            <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>
                                {pathname === '/admin' ? 'Dashboard' : pathname.split('/').pop().charAt(0).toUpperCase() + pathname.split('/').pop().slice(1).replace('-', ' ')}
                            </span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} className="mobile-hide">
                            <Search size={16} style={{ position: 'absolute', left: '1rem', color: '#94a3b8' }} />
                            <input
                                type="text"
                                placeholder="Search..."
                                style={{
                                    padding: '0.5rem 1rem 0.5rem 2.5rem',
                                    backgroundColor: '#f8fafc',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '10px',
                                    width: '180px',
                                    fontSize: '0.85rem',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <button style={{ position: 'relative', padding: '0.5rem', color: '#64748b', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
                            <Bell size={20} />
                            <span style={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                width: '8px',
                                height: '8px',
                                backgroundColor: 'var(--error)',
                                borderRadius: '50%',
                                border: '2px solid white'
                            }} />
                        </button>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            paddingLeft: isMobile ? '0.5rem' : '1.25rem',
                            borderLeft: isMobile ? 'none' : '1px solid #f1f5f9'
                        }}>
                            <img src="https://ui-avatars.com/api/?name=Admin+User&background=2563eb&color=fff" alt="Avatar" style={{ width: '36px', height: '36px', borderRadius: '10px' }} />
                            <div className="mobile-hide">
                                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)' }}>Admin User</div>
                                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Super Admin</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div style={{ padding: isMobile ? '1.5rem 1rem' : '2rem' }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
