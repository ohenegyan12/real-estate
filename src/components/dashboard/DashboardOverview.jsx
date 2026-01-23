import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Home, Eye, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, change, isPositive }) => (
    <div className="stat-card">
        <div className="stat-icon" style={{ backgroundColor: isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(37, 99, 235, 0.1)' }}>
            <Icon size={24} color={isPositive ? '#10b981' : '#2563eb'} />
        </div>
        <div className="stat-info">
            <p className="stat-title">{title}</p>
            <h3 className="stat-value">{value}</h3>
            <div className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
                {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                <span>{change}% from last month</span>
            </div>
        </div>
        <style jsx>{`
      .stat-card {
        background: white;
        padding: 1.5rem;
        border-radius: var(--radius-lg);
        display: flex;
        gap: 1.25rem;
        box-shadow: var(--shadow-md);
        border: 1px solid rgba(0,0,0,0.05);
      }
      .stat-icon {
        width: 54px;
        height: 54px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .stat-title {
        color: var(--text-light);
        font-size: 0.9rem;
        margin-bottom: 0.25rem;
      }
      .stat-value {
        font-size: 1.5rem;
        color: var(--primary);
        font-weight: 700;
      }
      .stat-change {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.8rem;
        margin-top: 0.5rem;
      }
      .stat-change.positive { color: #10b981; }
      .stat-change.negative { color: #2563eb; }
    `}</style>
    </div>
);

const DashboardOverview = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="overview-container"
        >
            <div className="dashboard-header">
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Dashboard Overview</h2>
                <p style={{ color: 'var(--text-light)' }}>Welcome back! Here's what's happening with your properties today.</p>
            </div>

            <div className="stats-grid">
                <StatCard title="Total Properties" value="24" icon={Home} change="12" isPositive={true} />
                <StatCard title="Total Views" value="12,450" icon={Eye} change="8" isPositive={true} />
                <StatCard title="New Leads" value="148" icon={Users} change="5" isPositive={false} />
                <StatCard title="Active Revenue" value="$4.2M" icon={TrendingUp} change="15" isPositive={true} />
            </div>

            <div className="recent-activity" style={{ marginTop: '2rem' }}>
                <div className="card">
                    <h3>Recent Listings</h3>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Property</th>
                                    <th>Location</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { id: 1, title: 'Skyline Penthouse', loc: 'Downtown, NY', price: '$1,200,000', status: 'Active' },
                                    { id: 2, title: 'Lakeside Villa', loc: 'Reston, VA', price: '$850,000', status: 'Pending' },
                                    { id: 3, title: 'Modern Studio', loc: 'Austin, TX', price: '$450,000', status: 'Active' },
                                ].map(item => (
                                    <tr key={item.id}>
                                        <td><strong>{item.title}</strong></td>
                                        <td>{item.loc}</td>
                                        <td>{item.price}</td>
                                        <td><span className={`status-badge ${item.status.toLowerCase()}`}>{item.status}</span></td>
                                        <td><button className="action-btn">Edit</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .overview-container {
          padding-bottom: 2rem;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .card {
          background: white;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          border: 1px solid rgba(0,0,0,0.05);
        }
        .card h3 {
          margin-bottom: 1.5rem;
          font-size: 1.25rem;
        }
        .table-container {
          overflow-x: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        th {
          padding: 1rem;
          border-bottom: 1px solid #eee;
          color: var(--text-light);
          font-weight: 500;
          font-size: 0.9rem;
        }
        td {
          padding: 1.25rem 1rem;
          border-bottom: 1px solid #f9f9f9;
        }
        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .status-badge.active { background: #e6fffa; color: #319795; }
        .status-badge.pending { background: #fffaf0; color: #dd6b20; }
        .action-btn {
          color: var(--accent);
          font-weight: 500;
          font-size: 0.9rem;
        }
      `}</style>
        </motion.div>
    );
};

export default DashboardOverview;
