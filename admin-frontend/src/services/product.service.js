import api from './api';

export const productService = {
    // Get all products
    getAll: async (params = {}) => {
        try {
            const response = await api.get('/products', { params });
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Get product by ID
    getById: async (id) => {
        try {
            const response = await api.get(`/products/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Create new product
    create: async (productData) => {
        try {
            const response = await api.post('/products', productData);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Update product
    update: async (id, productData) => {
        try {
            const response = await api.put(`/products/${id}`, productData);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Delete product
    delete: async (id) => {
        try {
            const response = await api.delete(`/products/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Search products
    search: async (query) => {
        try {
            const response = await api.get('/products/search', { params: { q: query } });
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Get product categories
    getCategories: async () => {
        try {
            const response = await api.get('/products/categories');
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Upload product image
    uploadImage: async (id, imageFile) => {
        try {
            const formData = new FormData();
            formData.append('image', imageFile);

            const response = await api.post(`/products/${id}/image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response;
        } catch (error) {
            throw error;
        }
    },
};
