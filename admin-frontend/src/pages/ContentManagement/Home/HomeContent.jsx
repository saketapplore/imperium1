import React, { useState } from 'react';
import CoreOfferingsManager from './CoreOfferingsManager';
import { Layout } from 'lucide-react';

const HomeContent = () => {
    // In future this can hold tabs for Hero, Testimonials, etc.
    // For now it just renders the Core Offerings manager.

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Layout className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Home Page Content</h2>
                    <p className="text-sm text-gray-500">Manage sections visible on the landing page</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Core Offerings Section */}
                <CoreOfferingsManager />

                {/* Future: Hero Section Manager */}
                {/* Future: Testimonials Manager */}
            </div>
        </div>
    );
};

export default HomeContent;
