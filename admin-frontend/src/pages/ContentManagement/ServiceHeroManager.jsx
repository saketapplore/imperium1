import React, { useState, useEffect } from 'react';
import { Save, Loader2, Type } from 'lucide-react';
import api from '../../services/api';

const ServiceHeroManager = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        subheading: '',
        headingMain: '',
        headingAccent: '',
        description: ''
    });

    const fetchHero = async () => {
        try {
            const response = await api.get('/admin/content/service-hero');
            if (response.data.success) {
                const { hero } = response.data.data;
                setFormData({
                    subheading: hero.subheading || '',
                    headingMain: hero.headingMain || '',
                    headingAccent: hero.headingAccent || '',
                    description: hero.description || ''
                });
            }
        } catch (error) {
            console.error('Error fetching service hero:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHero();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.put('/admin/content/service-hero', formData);
            alert('Service Hero updated successfully!');
        } catch (error) {
            console.error('Error updating service hero:', error);
            alert('Failed to update hero');
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
                        <Type className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Services Hero</h3>
                        <p className="text-sm text-gray-500">Manage the introduction text of the Services page</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Subheading</label>
                        <input
                            type="text"
                            value={formData.subheading}
                            onChange={(e) => setFormData({ ...formData, subheading: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#001B2F] focus:border-transparent transition-all outline-none"
                            placeholder="e.g. Our services"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Heading (Main)</label>
                        <input
                            type="text"
                            value={formData.headingMain}
                            onChange={(e) => setFormData({ ...formData, headingMain: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#001B2F] focus:border-transparent transition-all outline-none"
                            placeholder="e.g. Strategic Solutions for"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Heading (Accent/Gold)</label>
                        <input
                            type="text"
                            value={formData.headingAccent}
                            onChange={(e) => setFormData({ ...formData, headingAccent: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#001B2F] focus:border-transparent transition-all outline-none"
                            placeholder="e.g. Global Expansion"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Description Paragraph</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#001B2F] focus:border-transparent transition-all outline-none resize-none"
                        placeholder="Enter the hero description..."
                    />
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={saving}
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

export default ServiceHeroManager;
