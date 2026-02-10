import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, ChevronRight, GripVertical } from 'lucide-react';
import api from '../../../services/api';

const CoreOfferingsManager = () => {
    const [offerings, setOfferings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        displayOrder: 0,
        isVisible: true
    });
    const [editingId, setEditingId] = useState(null);

    // Fetch offerings
    const fetchOfferings = async () => {
        try {
            const response = await api.get('/admin/content/core-offerings');
            if (response.data.success) {
                const sortedOfferings = [...(response.data.data.offerings || [])].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
                setOfferings(sortedOfferings);
            }
        } catch (error) {
            console.error('Error fetching core offerings:', error);
            // Fallback for development/demo purposes or handle specific error structures
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOfferings();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/admin/content/core-offerings/${editingId}`, formData);
            } else {
                await api.post('/admin/content/core-offerings', formData);
            }
            setIsModalOpen(false);
            setEditingId(null);
            setFormData({ title: '', description: '', displayOrder: 0, isVisible: true });
            fetchOfferings();
        } catch (error) {
            console.error('Error saving offering:', error);
            alert('Failed to save offering');
        }
    };

    const handleEdit = (offering) => {
        setFormData({
            title: offering.title,
            description: offering.description,
            displayOrder: offering.displayOrder || 0,
            isVisible: offering.isVisible
        });
        setEditingId(offering._id);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this offering?')) {
            try {
                await api.delete(`/admin/content/core-offerings/${id}`);
                fetchOfferings();
            } catch (error) {
                console.error('Error deleting offering:', error);
                alert('Failed to delete offering');
            }
        }
    };

    const openCreateModal = () => {
        const maxOrder = offerings.length > 0 ? Math.max(...offerings.map(o => o.displayOrder || 0)) : 0;
        setFormData({ title: '', description: '', displayOrder: maxOrder + 1, isVisible: true });
        setEditingId(null);
        setIsModalOpen(true);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Core Offerings</h3>
                    <p className="text-sm text-gray-500">Manage the services list on the home page</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 bg-[#001B2F] text-white px-4 py-2 rounded-lg hover:bg-[#002B4F] transition-colors text-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    Add Offering
                </button>
            </div>

            <div className="divide-y divide-gray-100">
                {offerings.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No offerings found. Add one to get started.
                    </div>
                ) : (
                    offerings.map((offering) => (
                        <div key={offering._id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <div className="p-2 text-gray-400 cursor-move">
                                    <GripVertical className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900">{offering.title}</h4>
                                    {offering.description && (
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{offering.description}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleEdit(offering)}
                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Edit"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(offering._id)}
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
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-gray-900">
                                {editingId ? 'Edit Offering' : 'Add New Offering'}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-200 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001B2F]/20 focus:border-[#001B2F]"
                                    placeholder="e.g. Private Label Development"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description <span className="text-gray-400 font-normal">(Optional)</span>
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001B2F]/20 focus:border-[#001B2F] min-h-[100px]"
                                    placeholder="Enter details about this service..."
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

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isVisible"
                                    checked={formData.isVisible}
                                    onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                                    className="rounded border-gray-300 text-[#001B2F] focus:ring-[#001B2F]"
                                />
                                <label htmlFor="isVisible" className="text-sm text-gray-700">Visible on website</label>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#001B2F] hover:bg-[#002B4F] rounded-lg transition-colors"
                                >
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoreOfferingsManager;
