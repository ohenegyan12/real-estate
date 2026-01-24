import React, { useState, useEffect } from 'react';
import { statsService, propertyService } from '../../services/api';
import { Link } from 'react-router-dom';
import {
    TrendingUp,
    Home,
    Users,
    MessageSquare,
    ArrowUpRight,
    ArrowDownRight,
    Eye,
    Calendar,
    ChevronRight,
    ArrowRight
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const StatCard = ({ label, value, change, trend, icon: Icon, color }) => (
    <div className="admin-card admin-card-hover" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        cursor: 'default'
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: `${color}10`,
                color: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Icon size={20} />
            </div>
            <div className={`status-badge ${trend === 'up' ? 'status-active' : 'status-sold'}`} style={{ fontSize: '0.7rem' }}>
                {trend === 'up' ? <ArrowUpRight size={12} style={{ marginRight: '2px' }} /> : <ArrowDownRight size={12} style={{ marginRight: '2px' }} />}
                {change}
            </div>
        </div>
        <div>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{label}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)' }}>{value}</div>
        </div>
    </div>
);

const DashboardOverview = () => {
    const [stats, setStats] = useState({
        totalProperties: 0,
        activeListings: 0,
        totalInquiries: 0,
        activeRevenue: 0,
        recentProperties: [],
        settingsStats: {},
        trends: {
            properties: '0%',
            inquiries: '0%',
            revenue: '0%'
        }
    });
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsData, chartDataResponse] = await Promise.all([
                    statsService.getDashboardStats(),
                    statsService.getDashboardChart()
                ]);
                setStats({
                    ...statsData,
                    trends: statsData.trends || {
                        properties: '0%',
                        inquiries: '0%',
                        revenue: '0%'
                    }
                });
                setChartData(chartDataResponse);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) return <div style={{ padding: '2rem' }}>Loading dashboard...</div>;

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-GH', {
            style: 'currency',
            currency: 'GHS',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Page Title */}
            <div>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '0.5rem' }}>Dashboard Overview</h1>
                <p style={{ color: '#64748b' }}>Welcome back! Here's what's happening with your properties.</p>
            </div>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem'
            }}>
                <StatCard
                    label="Total Properties"
                    value={stats.totalProperties}
                    change={stats.trends.properties}
                    trend={stats.trends.properties.startsWith('+') ? 'up' : 'down'}
                    icon={Home}
                    color="#2563eb"
                />
                <StatCard
                    label="Active Listings"
                    value={stats.activeListings}
                    change={stats.trends.properties}
                    trend={stats.trends.properties.startsWith('+') ? 'up' : 'down'}
                    icon={TrendingUp}
                    color="#10b981"
                />
                <StatCard
                    label="Total Inquiries"
                    value={stats.totalInquiries}
                    change={stats.trends.inquiries}
                    trend={stats.trends.inquiries.startsWith('+') ? 'up' : 'down'}
                    icon={MessageSquare}
                    color="#f59e0b"
                />
                <StatCard
                    label="Active Revenue"
                    value={formatCurrency(stats.activeRevenue || 0)}
                    change={stats.trends.revenue}
                    trend={stats.trends.revenue.startsWith('+') ? 'up' : 'down'}
                    icon={TrendingUp}
                    color="#6366f1"
                />
            </div>

            {/* Public Stats (From Settings) */}
            <div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', color: '#64748b' }}>Publicly Displayed Stats (From Settings)</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '1rem'
                }}>
                    <div className="admin-card" style={{ padding: '1rem' }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase' }}>Years Exp.</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '800' }}>{stats.settingsStats.yearsExperience || '0'}</div>
                    </div>
                    <div className="admin-card" style={{ padding: '1rem' }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase' }}>Public Properties</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '800' }}>{stats.settingsStats.propertiesListed || '0'}</div>
                    </div>
                    <div className="admin-card" style={{ padding: '1rem' }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase' }}>Happy Clients</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '800' }}>{stats.settingsStats.happyClients || '0'}</div>
                    </div>
                    <div className="admin-card" style={{ padding: '1rem' }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase' }}>Awards Won</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '800' }}>{stats.settingsStats.awardsWon || '0'}</div>
                    </div>
                </div>
            </div>

            {/* Content Mid Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                {/* Main Chart Placeholder */}
                <div className="admin-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Properties Statistics</h2>
                        <select className="admin-input" style={{ width: 'auto', padding: '0.4rem 2rem 0.4rem 1rem', fontSize: '0.8rem' }}>
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>Last 12 Months</option>
                        </select>
                    </div>
                    <div style={{
                        height: '350px',
                        width: '100%',
                        marginTop: '1rem'
                    }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorInquiries" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        borderRadius: '12px',
                                        border: '1px solid #e2e8f0',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="views"
                                    stroke="var(--accent)"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorViews)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="inquiries"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorInquiries)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Bottom Section - Recent Properties Table */}
            <div className="admin-card">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Recently Added</h2>
                    <Link to="/admin/properties" style={{
                        color: 'var(--accent)',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        backgroundColor: 'rgba(37, 99, 235, 0.05)',
                        padding: '0.5rem 1rem',
                        borderRadius: '10px',
                        width: 'fit-content'
                    }}>View All Properties</Link>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem' }}>
                        <thead>
                            <tr style={{ textAlign: 'left' }}>
                                <th style={{ padding: '0.75rem 1rem', color: '#94a3b8', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Property</th>
                                <th style={{ padding: '0.75rem 1rem', color: '#94a3b8', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Location</th>
                                <th style={{ padding: '0.75rem 1rem', color: '#94a3b8', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Price</th>
                                <th style={{ padding: '0.75rem 1rem', color: '#94a3b8', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Status</th>
                                <th style={{ padding: '0.75rem 1rem', color: '#94a3b8', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'right' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recentProperties.map((prop) => (
                                <tr key={prop.id} style={{ backgroundColor: '#f8fafc', borderRadius: '12px' }}>
                                    <td style={{ padding: '0.75rem 1rem', borderRadius: '12px 0 0 12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <img src={prop.image} alt={prop.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                                            <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{prop.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '0.75rem 1rem', color: '#64748b', fontSize: '0.85rem' }}>{prop.location}</td>
                                    <td style={{ padding: '0.75rem 1rem', fontWeight: '800', fontSize: '0.9rem' }}>{prop.price}</td>
                                    <td style={{ padding: '0.75rem 1rem' }}>
                                        <span className={`status-badge ${prop.status === 'Active' ? 'status-active' : prop.status === 'Pending' ? 'status-pending' : 'status-sold'}`}>
                                            {prop.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right', borderRadius: '0 12px 12px 0' }}>
                                        <button style={{
                                            padding: '0.4rem',
                                            borderRadius: '8px',
                                            backgroundColor: 'white',
                                            border: '1px solid #e2e8f0',
                                            color: '#94a3b8'
                                        }}><ChevronRight size={16} /></button>
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

export default DashboardOverview;
