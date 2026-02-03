const API_BASE_URL = '/api';

const handleResponse = async (response) => {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || data.error || 'API request failed');
        }
        return data;
    } else {
        const text = await response.text();
        if (!response.ok) {
            throw new Error(text || 'API request failed');
        }
        return { message: 'Success', result: text }; // Fallback for non-JSON success
    }
};

export const propertyService = {
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/properties`);
        return handleResponse(response);
    },
    create: async (data) => {
        const response = await fetch(`${API_BASE_URL}/properties`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },
    update: async (id, data) => {
        const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },
    delete: async (id) => {
        const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
            method: 'DELETE'
        });
        return handleResponse(response);
    },
    getByCategory: async (type) => {
        const response = await fetch(`${API_BASE_URL}/properties/category/${type}`);
        return handleResponse(response);
    },
    getTypes: async () => {
        const response = await fetch(`${API_BASE_URL}/types`);
        return handleResponse(response);
    },
    getLocations: async () => {
        const response = await fetch(`${API_BASE_URL}/locations`);
        return handleResponse(response);
    },
    getFeatured: async () => {
        const response = await fetch(`${API_BASE_URL}/properties/featured`);
        return handleResponse(response);
    },
    getById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/properties/${id}`);
        return handleResponse(response);
    },
    updateStatus: async (id, status) => {
        const response = await fetch(`${API_BASE_URL}/properties/${id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        return handleResponse(response);
    }
};

export const categoryService = {
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/categories`);
        return handleResponse(response);
    }
};

export const settingsService = {
    get: async () => {
        const response = await fetch(`${API_BASE_URL}/settings`);
        return handleResponse(response);
    },
    update: async (data) => {
        const response = await fetch(`${API_BASE_URL}/settings`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    }
};

export const statsService = {
    getDashboardStats: async () => {
        const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
        return handleResponse(response);
    },
    getDashboardChart: async () => {
        const response = await fetch(`${API_BASE_URL}/dashboard/chart`);
        return handleResponse(response);
    }
};

export const inquiryService = {
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/inquiries`);
        return handleResponse(response);
    },
    create: async (data) => {
        const response = await fetch(`${API_BASE_URL}/inquiries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },
    update: async (id, status) => {
        const response = await fetch(`${API_BASE_URL}/inquiries/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        return handleResponse(response);
    },
    delete: async (id) => {
        const response = await fetch(`${API_BASE_URL}/inquiries/${id}`, {
            method: 'DELETE'
        });
        return handleResponse(response);
    }
};

export const authService = {
    login: async (credentials) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        return handleResponse(response);
    },
    forgotPassword: async (email) => {
        const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        return handleResponse(response);
    },
    resetPassword: async (email, newPassword) => {
        const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, newPassword })
        });
        return handleResponse(response);
    },
    verify: async () => {
        const response = await fetch(`${API_BASE_URL}/auth/verify`);
        return handleResponse(response);
    },
    updateProfile: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/auth/update-profile`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return handleResponse(response);
    },
    changePassword: async (passwordData) => {
        const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(passwordData)
        });
        return handleResponse(response);
    }
};

export const blogService = {
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/posts`);
        return handleResponse(response);
    }
};

export const newsletterService = {
    subscribe: async (email) => {
        const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        return handleResponse(response);
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
        return handleResponse(response);
    }
};
