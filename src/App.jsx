import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

// Auth Pages
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Dashboard Pages
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardOverview from './pages/dashboard/DashboardOverview';
import ManageProperties from './pages/dashboard/ManageProperties';
import SiteSettings from './pages/dashboard/SiteSettings';
import Inquiries from './pages/dashboard/Inquiries';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="properties" element={<ManageProperties />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="settings" element={<SiteSettings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
