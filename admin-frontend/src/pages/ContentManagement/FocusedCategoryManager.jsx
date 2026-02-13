import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, GripVertical, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import api from '../../services/api';

const FocusedCategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        displayOrder: 0,
        isVisible: true
    });
    const [editingId, setEditingId] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await api.get('/admin/content/focused-categories');
            if (response.data.success) {
                setCategories(response.data.data.categories || []);
            }
        } catch (error) {
            console.error('Error fetching focused categories:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        if (file.size > 20 * 1024 * 1024) {
            alert('Image size should be less than 20MB');
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
                await api.put(`/admin/content/focused-categories/${editingId}`, formData);
            } else {
                await api.post('/admin/content/focused-categories', formData);
            }
            setIsModalOpen(false);
            setEditingId(null);
            setFormData({
                title: '',
                description: '',
                image: '',
                displayOrder: 0,
                isVisible: true
            });
            fetchCategories();
        } catch (error) {
            console.error('Error saving category:', error);
            alert('Failed to save category');
        }
    };

    const handleEdit = (category) => {
        setFormData({
            title: category.title,
            description: category.description || '',
            image: category.image || '',
            displayOrder: category.displayOrder || 0,
            isVisible: category.isVisible
        });
        setEditingId(category._id);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await api.delete(`/admin/content/focused-categories/${id}`);
                fetchCategories();
            } catch (error) {
                console.error('Error deleting category:', error);
                alert('Failed to delete category');
            }
        }
    };

    const openCreateModal = () => {
        const maxOrder = categories.length > 0 ? Math.max(...categories.map(c => c.displayOrder || 0)) : 0;

        setFormData({
            title: '',
            description: '',
            image: '',
            displayOrder: maxOrder + 1,
            isVisible: true
        });
        setEditingId(null);
        setIsModalOpen(true);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-8">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Focused Categories</h3>
                    <p className="text-sm text-gray-500">Manage the category slider for the Services page</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 bg-[#001B2F] text-white px-4 py-2 rounded-lg hover:bg-[#002B4F] transition-colors text-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    Add Category
                </button>
            </div>

            <div className="divide-y divide-gray-100">
                {categories.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No categories found. Add one to get started.
                    </div>
                ) : (
                    categories.map((category) => (
                        <div key={category._id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="p-2 text-gray-400 cursor-move">
                                    <GripVertical className="w-4 h-4" />
                                </div>
                                <div className="h-12 w-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                    {category.image ? (
                                        <img src={category.image} alt={category.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <ImageIcon className="w-6 h-6" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-gray-900 truncate">{category.title}</h4>
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{category.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleEdit(category)}
                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Edit"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(category._id)}
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

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 flex-shrink-0">
                            <h3 className="font-bold text-gray-900">
                                {editingId ? 'Edit Category' : 'Add New Category'}
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
                                                Recommended: landscape orientation. Max size 20MB.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001B2F]/20 focus:border-[#001B2F] min-h-[100px]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={formData.displayOrder}
                                        onChange={(e) => setFormData({ ...formData, displayOrder: Math.max(0, parseInt(e.target.value) || 0) })}
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

export default FocusedCategoryManager;
