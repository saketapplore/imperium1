import api from './api';

export const enquiryService = {
    // Get all enquiries with optional search and status filter
    getAllEnquiries: async (params) => {
        try {
            const response = await api.get('/admin/enquiries', { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update enquiry status
    updateStatus: async (id, status) => {
        try {
            const response = await api.put(`/admin/enquiries/${id}/status`, { status });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update internal notes
    updateNotes: async (id, internalNotes) => {
        try {
            const response = await api.put(`/admin/enquiries/${id}/notes`, { internalNotes });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete enquiry
    deleteEnquiry: async (id) => {
        try {
            const response = await api.delete(`/admin/enquiries/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};
