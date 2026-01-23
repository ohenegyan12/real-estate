import React, { useState } from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  Home,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import UploadProperty from '../components/dashboard/UploadProperty';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'upload', label: 'Upload Property', icon: PlusCircle },
    { id: 'listings', label: 'My Listings', icon: Home },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'upload':
        return <UploadProperty />;
      default:
        return (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-light)' }}>
            <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section</h2>
            <p>This section is coming soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo">
            <img src="/logo.jpeg" alt="Logo" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
            {isSidebarOpen && <span>Owusu Homes</span>}
          </div>
          <button className="mobile-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span>{item.label}</span>}
              {activeTab === item.id && isSidebarOpen && (
                <motion.div layoutId="active-pill" className="active-pill" />
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout">
            <LogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="main-header">
          <div className="header-search">
            <Search size={18} />
            <input type="text" placeholder="Search for properties, leads..." />
          </div>
          <div className="header-actions">
            <button className="icon-btn">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
            <div className="user-profile">
              <div className="user-avatar">AD</div>
              <div className="user-info">
                <p className="user-name">Admin User</p>
                <p className="user-role">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        <div className="content-area">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <style jsx>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          background-color: #f4f7fe;
          color: var(--primary);
        }

        /* Sidebar Styles */
        .dashboard-sidebar {
          width: 280px;
          background: #1a1c1e;
          color: white;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
        }
        .dashboard-sidebar.closed {
          width: 80px;
          padding: 1.5rem 0.75rem;
        }
        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 3rem;
          padding: 0 0.5rem;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
          font-weight: 700;
        }
        .logo-icon {
          width: 32px;
          height: 32px;
          background: var(--accent);
          border-radius: 8px;
        }
        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem 1rem;
          border-radius: 12px;
          color: #9ca3af;
          transition: all 0.2s;
          position: relative;
          width: 100%;
          text-align: left;
        }
        .nav-item:hover {
          color: white;
          background: rgba(255,255,255,0.05);
        }
        .nav-item.active {
          color: white;
          background: rgba(37, 99, 235, 0.1);
        }
        .active-pill {
          position: absolute;
          left: -1.5rem;
          width: 4px;
          height: 24px;
          background: var(--accent);
          border-radius: 0 4px 4px 0;
        }
        .logout {
          margin-top: auto;
          color: #f87171;
        }
        .logout:hover {
          background: rgba(248, 113, 113, 0.1);
          color: #f87171;
        }

        /* Main Content Styles */
        .dashboard-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
        }
        .main-header {
          height: 80px;
          background: white;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #eef2f6;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .header-search {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: #f4f7fe;
          padding: 0.6rem 1rem;
          border-radius: 20px;
          width: 300px;
          color: var(--text-light);
        }
        .header-search input {
          background: transparent;
          border: none;
          outline: none;
          width: 100%;
          font-family: inherit;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .icon-btn {
          position: relative;
          color: var(--text-light);
          padding: 0.5rem;
          border-radius: 50%;
          transition: background 0.2s;
        }
        .icon-btn:hover { background: #f4f7fe; }
        .notification-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
          border: 2px solid white;
        }
        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-left: 1.5rem;
          border-left: 1px solid #eef2f6;
        }
        .user-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--accent), #1d4ed8);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.85rem;
        }
        .user-name {
          font-weight: 600;
          font-size: 0.9rem;
        }
        .user-role {
          font-size: 0.75rem;
          color: var(--text-light);
        }

        .content-area {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }

        @media (max-width: 768px) {
          .dashboard-sidebar {
            position: fixed;
            height: 100vh;
            left: -280px;
          }
          .dashboard-sidebar.open {
            left: 0;
          }
          .main-header {
            padding: 0 1rem;
          }
          .header-search { display: none; }
          .content-area { padding: 1.5rem 1rem; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
