import api from './api';

export const settingService = {
    // Get all global settings
    getSettings: async () => {
        try {
            const response = await api.get('/admin/settings');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update notification emails
    updateNotificationEmails: async (notificationEmails) => {
        try {
            const response = await api.put('/admin/settings/notifications', { notificationEmails });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update contact details
    updateContactDetails: async (contactDetails) => {
        try {
            const response = await api.put('/admin/settings/contact', { contactDetails });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};
