import React, { useState, useEffect } from 'react';
import { Save, Loader2, Info } from 'lucide-react';
import api from '../../../services/api';

const HomeHeroManager = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        headline: '',
        subtext: '',
        primaryCTA: { text: '', link: '' },
        secondaryCTA: { text: '', link: '' }
    });

    const fetchHero = async () => {
        try {
            const response = await api.get('/admin/content/home-hero');
            if (response.data.success) {
                const { hero } = response.data.data;
                setFormData({
                    headline: hero.headline || '',
                    subtext: hero.subtext || '',
                    primaryCTA: hero.primaryCTA || { text: 'Explore Solutions', link: '#services' },
                    secondaryCTA: hero.secondaryCTA || { text: 'Contact us', link: '#contact' }
                });
            }
        } catch (error) {
            console.error('Error fetching hero content:', error);
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
            await api.put('/admin/content/home-hero', formData);
            alert('Hero content updated successfully!');
        } catch (error) {
            console.error('Error updating hero content:', error);
            alert('Failed to update hero content');
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
                    <Info className="w-5 h-5 text-blue-500" />
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Home Text & Paragraph</h3>
                        <p className="text-sm text-gray-500">Manage the main heading and description on the home page hero section</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Heading (Headline)</label>
                        <textarea
                            value={formData.headline}
                            onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001B2F]/20 focus:border-[#001B2F] min-h-[100px] text-lg font-medium"
                            required
                            placeholder="Enter the main headline..."
                        />
                        <p className="text-xs text-gray-400 mt-2">Tip: Use &lt;br /&gt; for line breaks if needed in the code representation.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description (Subtext)</label>
                        <textarea
                            value={formData.subtext}
                            onChange={(e) => setFormData({ ...formData, subtext: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001B2F]/20 focus:border-[#001B2F] min-h-[120px] leading-relaxed text-gray-600"
                            required
                            placeholder="Enter the hero description..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-50">
                        <div className="space-y-4">
                            <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Primary Call to Action</h4>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Button Text</label>
                                <input
                                    type="text"
                                    value={formData.primaryCTA.text}
                                    onChange={(e) => setFormData({ ...formData, primaryCTA: { ...formData.primaryCTA, text: e.target.value } })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Link URL</label>
                                <input
                                    type="text"
                                    value={formData.primaryCTA.link}
                                    onChange={(e) => setFormData({ ...formData, primaryCTA: { ...formData.primaryCTA, link: e.target.value } })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Secondary Call to Action</h4>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Button Text</label>
                                <input
                                    type="text"
                                    value={formData.secondaryCTA.text}
                                    onChange={(e) => setFormData({ ...formData, secondaryCTA: { ...formData.secondaryCTA, text: e.target.value } })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Link URL</label>
                                <input
                                    type="text"
                                    value={formData.secondaryCTA.link}
                                    onChange={(e) => setFormData({ ...formData, secondaryCTA: { ...formData.secondaryCTA, link: e.target.value } })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 bg-[#001B2F] text-white px-8 py-3 rounded-lg hover:bg-[#002B4F] transition-all font-bold disabled:opacity-50 shadow-md hover:shadow-lg active:scale-95"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {saving ? 'Saving...' : 'Update Hero Content'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HomeHeroManager;
