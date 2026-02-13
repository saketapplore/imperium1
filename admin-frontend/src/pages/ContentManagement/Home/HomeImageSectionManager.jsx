import React, { useState, useEffect } from 'react';
import { Save, Loader2, Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import api from '../../../services/api';

const HomeImageSectionManager = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [formData, setFormData] = useState({
        image: '',
        isActive: true
    });

    const fetchSection = async () => {
        try {
            const response = await api.get('/admin/content/home-image-section');
            if (response.data.success) {
                const { section } = response.data.data;
                setFormData({
                    image: section.image || '',
                    isActive: section.isActive !== undefined ? section.isActive : true
                });
            }
        } catch (error) {
            console.error('Error fetching home image section:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSection();
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
        setSaving(true);
        try {
            await api.put('/admin/content/home-image-section', formData);
            alert('Home image section updated successfully!');
        } catch (error) {
            console.error('Error updating home image section:', error);
            alert('Failed to update home image section');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="p-8 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#001B2F]" />
        </div>
    );

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <ImageIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Home Image Section</h3>
                        <p className="text-sm text-gray-500">Manage the large promotional image on the home page</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-700">Section Image</label>
                    <div className="flex flex-col md:flex-row items-start gap-6">
                        <div className="w-full md:w-2/3 aspect-[16/6] bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
                            {formData.image ? (
                                <>
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity gap-3">
                                        <label className="p-3 bg-white text-gray-900 rounded-full cursor-pointer hover:bg-gray-100 transition-colors shadow-lg">
                                            <Upload className="w-5 h-5" />
                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                                            className="p-3 bg-white text-red-600 rounded-full hover:bg-red-50 transition-colors shadow-lg"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-gray-400 flex flex-col items-center">
                                    {uploadingImage ? (
                                        <Loader2 className="w-10 h-10 animate-spin mb-2" />
                                    ) : (
                                        <ImageIcon className="w-12 h-12 mb-2" />
                                    )}
                                    <p className="text-sm font-medium">{uploadingImage ? 'Uploading...' : 'No image selected'}</p>
                                    <label className="mt-4 px-4 py-2 bg-[#001B2F] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#002B4F] transition-colors">
                                        Upload Image
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                    </label>
                                </div>
                            )}
                        </div>
                        <div className="flex-1 space-y-4">
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <h4 className="text-sm font-bold text-blue-900 mb-1 flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" /> Recommended Specs
                                </h4>
                                <ul className="text-xs text-blue-700 space-y-1">
                                    <li>• Width: ~1400px</li>
                                    <li>• Aspect Ratio: Wide (e.g. 16:6)</li>
                                    <li>• Max Size: 20MB</li>
                                </ul>
                            </div>
                            <div className="flex items-center gap-2 px-1">
                                <input
                                    type="checkbox"
                                    id="imageSectionActive"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    className="rounded border-gray-300 text-[#001B2F] focus:ring-[#001B2F]"
                                />
                                <label htmlFor="imageSectionActive" className="text-sm font-medium text-gray-700">
                                    Show this section on website
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={saving || uploadingImage}
                        className="flex items-center gap-2 bg-[#001B2F] text-white px-8 py-3 rounded-lg hover:bg-[#002B4F] transition-all font-bold disabled:opacity-50 shadow-md"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {saving ? 'Saving...' : 'Save Image Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HomeImageSectionManager;
