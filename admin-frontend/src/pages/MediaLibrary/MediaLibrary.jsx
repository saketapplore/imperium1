import { Image, Upload, Search, MoreVertical, Trash2, Download } from 'lucide-react';

const MediaLibrary = () => {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Media Library</h1>
                    <p className="text-gray-500 mt-1 font-medium">Manage your images, videos and documents</p>
                </div>
                <button className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20 font-bold active:scale-95">
                    <Upload className="w-4 h-4" />
                    <span>Upload Files</span>
                </button>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search media..."
                        className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1">
                        <div className="aspect-square bg-gray-50 relative overflow-hidden">
                            <img
                                src={`https://picsum.photos/seed/${i + 50}/400/400`}
                                alt="Media"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                                <button className="p-2 bg-white rounded-lg text-gray-900 hover:bg-primary-50 transition-colors">
                                    <Download className="w-4 h-4" />
                                </button>
                                <button className="p-2 bg-white rounded-lg text-red-600 hover:bg-red-50 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="p-4 flex items-center justify-between">
                            <div className="truncate">
                                <p className="text-sm font-bold text-gray-900 truncate">image_asset_{i}.jpg</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">JPEG • 1.2 MB</p>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                                <MoreVertical className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MediaLibrary;
