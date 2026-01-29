import api from './api';

export const authService = {
    // Login admin
    login: async (credentials) => {
        try {
            const response = await api.post('/admin/login', credentials);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Logout admin
    logout: async () => {
        try {
            // Usually logout might be client-side only (clearing token) 
            // but we can have an endpoint if the backend tracks sessions
            const response = await api.post('/admin/logout');
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Get current admin profile
    getCurrentUser: async () => {
        try {
            const response = await api.get('/admin/profile');
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Forgot password
    forgotPassword: async (email) => {
        try {
            const response = await api.post('/admin/forgot-password', { email });
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Reset password
    resetPassword: async (token, password) => {
        try {
            const response = await api.post(`/admin/reset-password/${token}`, { password });
            return response;
        } catch (error) {
            throw error;
        }
    },
};
