import { FileText, Plus, Search, Filter } from 'lucide-react';

const ContentManagement = () => {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Content Management</h1>
                    <p className="text-gray-500 mt-1 font-medium">Manage your website sections and pages</p>
                </div>
                <button className="flex items-center space-x-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20 font-semibold active:scale-95">
                    <Plus className="w-4 h-4" />
                    <span>Add New Section</span>
                </button>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search content..."
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
                        />
                    </div>
                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                        <button className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-gray-100 text-gray-600 hover:bg-gray-50 transition-all text-sm font-bold">
                            <Filter className="w-4 h-4" />
                            <span>Filter</span>
                        </button>
                    </div>
                </div>

                <div className="p-8 text-center py-20">
                    <div className="w-20 h-20 bg-primary-50 text-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <FileText className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-extrabold text-gray-900 mb-2">No Content Found</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mb-8 font-medium">Start by adding your first content section to the website.</p>
                    <button className="text-primary-600 font-bold hover:underline underline-offset-4">Learn more about CMS</button>
                </div>
            </div>
        </div>
    );
};

export default ContentManagement;
