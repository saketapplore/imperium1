import React, { useState, useEffect } from 'react';
import { Save, Loader2, Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import api from '../../../services/api';

const AboutImagesManager = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingTop, setUploadingTop] = useState(false);
    const [uploadingBottom, setUploadingBottom] = useState(false);
    const [formData, setFormData] = useState({
        topImage: '',
        bottomImage: ''
    });

    const fetchImages = async () => {
        try {
            const response = await api.get('/admin/content/about-images');
            if (response.data.success) {
                const { images } = response.data.data;
                setFormData({
                    topImage: images.topImage || '',
                    bottomImage: images.bottomImage || ''
                });
            }
        } catch (error) {
            console.error('Error fetching about images:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleImageUpload = async (e, field) => {
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

        const setUploading = field === 'topImage' ? setUploadingTop : setUploadingBottom;
        setUploading(true);
        try {
            const response = await api.post('/admin/uploads', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                setFormData(prev => ({ ...prev, [field]: response.data.data.url }));
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.put('/admin/content/about-images', formData);
            alert('About images updated successfully!');
        } catch (error) {
            console.error('Error updating about images:', error);
            alert('Failed to update images');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="p-8 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#001B2F]" />
        </div>
    );

    const ImageUploadSection = ({ label, value, field, uploading, hint }) => (
        <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">{label}</label>
            <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-full md:w-2/3 aspect-[16/9] bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
                    {value ? (
                        <>
                            <img src={value} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity gap-3">
                                <label className="p-3 bg-white text-gray-900 rounded-full cursor-pointer hover:bg-gray-100 transition-colors shadow-lg">
                                    <Upload className="w-5 h-5" />
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, field)} />
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, [field]: '' }))}
                                    className="p-3 bg-white text-red-600 rounded-full hover:bg-red-50 transition-colors shadow-lg"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-gray-400 flex flex-col items-center">
                            {uploading ? (
                                <Loader2 className="w-10 h-10 animate-spin mb-2" />
                            ) : (
                                <ImageIcon className="w-12 h-12 mb-2" />
                            )}
                            <p className="text-sm font-medium">{uploading ? 'Uploading...' : 'No image selected'}</p>
                            <label className="mt-4 px-4 py-2 bg-[#001B2F] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#002B4F] transition-colors">
                                Upload Image
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, field)} />
                            </label>
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h4 className="text-sm font-bold text-blue-900 mb-1 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4" /> {hint}
                        </h4>
                        <ul className="text-xs text-blue-700 space-y-1">
                            <li>• Aspect Ratio: Wide (e.g. 16:9)</li>
                            <li>• Max Size: 20MB</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                        <ImageIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Images in About Section</h3>
                        <p className="text-sm text-gray-500">Manage the promotional images on the About Us page</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-8">
                <ImageUploadSection
                    label="Top Image (Team Collaboration)"
                    value={formData.topImage}
                    field="topImage"
                    uploading={uploadingTop}
                    hint="First section image"
                />

                <div className="border-t border-gray-200 pt-8">
                    <ImageUploadSection
                        label="Bottom Image (Truck/CTA Section)"
                        value={formData.bottomImage}
                        field="bottomImage"
                        uploading={uploadingBottom}
                        hint="Call-to-action section image"
                    />
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={saving || uploadingTop || uploadingBottom}
                        className="flex items-center gap-2 bg-[#001B2F] text-white px-8 py-3 rounded-lg hover:bg-[#002B4F] transition-all font-bold disabled:opacity-50 shadow-md"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AboutImagesManager;
