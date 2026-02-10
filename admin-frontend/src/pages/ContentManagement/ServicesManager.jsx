import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, GripVertical, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import api from '../../services/api';

const ServicesManager = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        shortSummary: '',
        detailedDescription: '',
        image: '',
        displayOrder: 0,
        isVisible: true
    });
    const [editingId, setEditingId] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    // Fetch services
    const fetchServices = async () => {
        try {
            const response = await api.get('/admin/content/services');
            if (response.data.success) {
                setServices(response.data.data.services || []);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Basic validation
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            alert('Image size should be less than 5MB');
            return;
        }

        const data = new FormData();
        data.append('file', file);

        setUploadingImage(true);
        try {
            const response = await api.post('/admin/uploads', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                setFormData(prev => ({ ...prev, image: response.data.data.url }));
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/admin/content/services/${editingId}`, formData);
            } else {
                await api.post('/admin/content/services', formData);
            }
            setIsModalOpen(false);
            setEditingId(null);
            setFormData({
                title: '',
                shortSummary: '',
                detailedDescription: '',
                image: '',
                displayOrder: 0,
                isVisible: true
            });
            fetchServices();
        } catch (error) {
            console.error('Error saving service:', error);
            alert('Failed to save service');
        }
    };

    const handleEdit = (service) => {
        setFormData({
            title: service.title,
            shortSummary: service.shortSummary || '',
            detailedDescription: service.detailedDescription || '',
            image: service.image || '',
            displayOrder: service.displayOrder || 0,
            isVisible: service.isVisible
        });
        setEditingId(service._id);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await api.delete(`/admin/content/services/${id}`);
                fetchServices();
            } catch (error) {
                console.error('Error deleting service:', error);
                alert('Failed to delete service');
            }
        }
    };

    const openCreateModal = () => {
        // Find highest displayOrder to append
        const maxOrder = services.length > 0 ? Math.max(...services.map(s => s.displayOrder || 0)) : 0;

        setFormData({
            title: '',
            shortSummary: '',
            detailedDescription: '',
            image: '',
            displayOrder: maxOrder + 1,
            isVisible: true
        });
        setEditingId(null);
        setIsModalOpen(true);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Services</h3>
                    <p className="text-sm text-gray-500">Manage the services displayed on the Services page</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 bg-[#001B2F] text-white px-4 py-2 rounded-lg hover:bg-[#002B4F] transition-colors text-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    Add Service
                </button>
            </div>

            <div className="divide-y divide-gray-100">
                {services.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No services found. Add one to get started.
                    </div>
                ) : (
                    services.map((service) => (
                        <div key={service._id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="p-2 text-gray-400 cursor-move">
                                    <GripVertical className="w-4 h-4" />
                                </div>
                                {/* Thumbnail */}
                                <div className="h-12 w-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                    {service.image ? (
                                        <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <ImageIcon className="w-6 h-6" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-gray-900 truncate">{service.title}</h4>
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{service.shortSummary}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleEdit(service)}
                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Edit"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(service._id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 flex-shrink-0">
                            <h3 className="font-bold text-gray-900">
                                {editingId ? 'Edit Service' : 'Add New Service'}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-200 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001B2F]/20 focus:border-[#001B2F]"
                                        required
                                    />
                                </div>

                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                                    <div className="flex items-start gap-4">
                                        <div className="w-32 h-24 bg-gray-100 rounded-lg border border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
                                            {formData.image ? (
                                                <>
                                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                                                        className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                                                    >
                                                        <Trash2 className="w-6 h-6" />
                                                    </button>
                                                </>
                                            ) : (
                                                <div className="text-gray-400 flex flex-col items-center text-xs">
                                                    {uploadingImage ? <Loader2 className="w-6 h-6 animate-spin" /> : <ImageIcon className="w-6 h-6 mb-1" />}
                                                    <span>{uploadingImage ? 'Uploading...' : 'No image'}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-sm font-medium text-gray-700 w-fit">
                                                <Upload className="w-4 h-4" />
                                                Upload Image
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    disabled={uploadingImage}
                                                />
                                            </label>
                                            <p className="text-xs text-gray-500 mt-2">
                                                Recommended: 600x500px or similar ratio. Max sizes 5MB.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Short Summary (Used in cards)</label>
                                    <textarea
                                        value={formData.shortSummary}
                                        onChange={(e) => setFormData({ ...formData, shortSummary: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001B2F]/20 focus:border-[#001B2F] min-h-[60px]"
                                    />
                                </div>

                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description (Used in page)</label>
                                    <textarea
                                        value={formData.detailedDescription}
                                        onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001B2F]/20 focus:border-[#001B2F] min-h-[100px]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                                    <input
                                        type="number"
                                        value={formData.displayOrder}
                                        onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001B2F]/20 focus:border-[#001B2F]"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="isVisible"
                                    checked={formData.isVisible}
                                    onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                                    className="rounded border-gray-300 text-[#001B2F] focus:ring-[#001B2F]"
                                />
                                <label htmlFor="isVisible" className="text-sm text-gray-700">Visible on website</label>
                            </div>
                        </form>

                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 flex-shrink-0 bg-gray-50">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={uploadingImage}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#001B2F] hover:bg-[#002B4F] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Save className="w-4 h-4" />
                                {uploadingImage ? 'Uploading...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServicesManager;
