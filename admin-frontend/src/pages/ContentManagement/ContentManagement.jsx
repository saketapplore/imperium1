import { useState } from 'react';
import { FileText, Layout, Info, Layers } from 'lucide-react';
import HomeContent from './Home/HomeContent';
import ServicesManager from './ServicesManager';
import LeadershipManager from './About/LeadershipManager';

const ContentManagement = () => {
    const [activeTab, setActiveTab] = useState('home');

    const tabs = [
        { id: 'home', label: 'Home Page', icon: Layout },
        { id: 'about', label: 'About Us', icon: Info },
        { id: 'services', label: 'Services', icon: Layers },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Content Management</h1>
                    <p className="text-gray-500 mt-1 font-medium">Manage your website sections and pages</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Tabs Header */}
                <div className="flex border-b border-gray-100 overflow-x-auto">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${isActive
                                    ? 'border-[#001B2F] text-[#001B2F] bg-gray-50'
                                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'text-[#D9BB8E]' : 'text-gray-400'}`} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content */}
                <div className="p-6 md:p-8">
                    {activeTab === 'home' && <HomeContent />}

                    {activeTab === 'about' && <LeadershipManager />}

                    {activeTab === 'services' && <ServicesManager />}
                </div>
            </div>
        </div>
    );
};

export default ContentManagement;
