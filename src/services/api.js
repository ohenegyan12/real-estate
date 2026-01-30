const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5001/api'
    : '/api';

export const propertyService = {
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/properties`);
        return response.json();
    },
    create: async (data) => {
        const response = await fetch(`${API_BASE_URL}/properties`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    },
    update: async (id, data) => {
        const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    },
    delete: async (id) => {
        const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
            method: 'DELETE'
        });
        return response.json();
    },
    getByCategory: async (type) => {
        const response = await fetch(`${API_BASE_URL}/properties/category/${type}`);
        return response.json();
    },
    getTypes: async () => {
        const response = await fetch(`${API_BASE_URL}/types`);
        return response.json();
    },
    getLocations: async () => {
        const response = await fetch(`${API_BASE_URL}/locations`);
        return response.json();
    },
    getFeatured: async () => {
        const response = await fetch(`${API_BASE_URL}/properties/featured`);
        return response.json();
    },
    getById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/properties/${id}`);
        return response.json();
    },
    updateStatus: async (id, status) => {
        const response = await fetch(`${API_BASE_URL}/properties/${id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        return response.json();
    }
};

export const categoryService = {
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/categories`);
        return response.json();
    }
};

export const settingsService = {
    get: async () => {
        const response = await fetch(`${API_BASE_URL}/settings`);
        return response.json();
    },
    update: async (data) => {
        const response = await fetch(`${API_BASE_URL}/settings`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    }
};

export const statsService = {
    getDashboardStats: async () => {
        const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
        return response.json();
    },
    getDashboardChart: async () => {
        const response = await fetch(`${API_BASE_URL}/dashboard/chart`);
        return response.json();
    }
};

export const inquiryService = {
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/inquiries`);
        return response.json();
    },
    create: async (data) => {
        const response = await fetch(`${API_BASE_URL}/inquiries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    },
    update: async (id, status) => {
        const response = await fetch(`${API_BASE_URL}/inquiries/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        return response.json();
    },
    delete: async (id) => {
        const response = await fetch(`${API_BASE_URL}/inquiries/${id}`, {
            method: 'DELETE'
        });
        return response.json();
    }
};

export const authService = {
    login: async (credentials) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Login failed');
        return data;
    },
    forgotPassword: async (email) => {
        const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to send reset link');
        return data;
    },
    resetPassword: async (email, newPassword) => {
        const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, newPassword })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Reset failed');
        return data;
    },
    verify: async () => {
        const response = await fetch(`${API_BASE_URL}/auth/verify`);
        return response.json();
    },
    updateProfile: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/auth/update-profile`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return response.json();
    },
    changePassword: async (passwordData) => {
        const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(passwordData)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Update failed');
        return data;
    }
};

export const blogService = {
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/posts`);
        return response.json();
    }
};

export const newsletterService = {
    subscribe: async (email) => {
        const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        return response.json();
    }
};

export const mediaService = {
    upload: async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(`${API_BASE_URL}/upload`, {
            method: 'POST',
            body: formData
        });
        return response.json();
    }
};
