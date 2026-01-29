import { useAuth } from '../../hooks/useAuth';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import {
    Users,
    Package,
    ShoppingCart,
    DollarSign,
    TrendingUp,
    ArrowUpRight,
    Plus,
    BarChart3,
    Settings
} from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();

    const stats = [
        { title: 'Total Users', value: '1,234', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50', trend: '+12%' },
        { title: 'Total Products', value: '567', icon: Package, color: 'text-emerald-500', bg: 'bg-emerald-50', trend: '+5%' },
        { title: 'Total Orders', value: '890', icon: ShoppingCart, color: 'text-amber-500', bg: 'bg-amber-50', trend: '+18%' },
        { title: 'Revenue', value: '$12,345', icon: DollarSign, color: 'text-violet-500', bg: 'bg-violet-50', trend: '+25%' },
    ];

    const recentActivities = [
        { id: 1, action: 'New user registered', time: '5 minutes ago', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 2, action: 'Product updated', time: '15 minutes ago', icon: Package, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { id: 3, action: 'New order received', time: '1 hour ago', icon: ShoppingCart, color: 'text-amber-500', bg: 'bg-amber-50' },
        { id: 4, action: 'Payment processed', time: '2 hours ago', icon: DollarSign, color: 'text-violet-500', bg: 'bg-violet-50' },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 flex flex-col">
            <Navbar />

            <div className="flex flex-1">
                <Sidebar />

                <main className="flex-1 p-4 lg:p-8 overflow-y-auto animate-fade-in text-gray-900">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Dashboard Overview</h1>
                            <p className="text-gray-500 mt-2 font-medium">
                                Welcome back, <span className="text-primary-600 underline underline-offset-4 decoration-primary-200">{user?.name || 'Admin'}</span>
                            </p>
                        </div>
                        <div className="flex space-x-3 w-full sm:w-auto">
                            <button className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm font-semibold active:scale-95">
                                <BarChart3 className="w-4 h-4" />
                                <span>Export Reports</span>
                            </button>
                            <button className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20 font-semibold active:scale-95">
                                <Plus className="w-4 h-4" />
                                <span>New Record</span>
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl hover:border-primary-100 transition-all duration-300 group">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-xs font-bold">
                                            <span>{stat.trend}</span>
                                            <TrendingUp className="w-3 h-3 ml-1" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.title}</p>
                                        <p className="text-3xl font-black text-gray-900 mt-2">{stat.value}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Recent Activity */}
                        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                                <button className="text-primary-600 text-sm font-bold hover:text-primary-700 flex items-center group">
                                    View Full History <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </button>
                            </div>
                            <div className="p-8">
                                <div className="space-y-8">
                                    {recentActivities.map((activity) => {
                                        const Icon = activity.icon;
                                        return (
                                            <div key={activity.id} className="flex items-center space-x-5 group cursor-pointer">
                                                <div className={`p-3 rounded-xl ${activity.bg} ${activity.color} transition-colors group-hover:bg-opacity-100`}>
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-base font-bold text-gray-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{activity.action}</p>
                                                    <p className="text-sm text-gray-500 font-medium">{activity.time}</p>
                                                </div>
                                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ArrowUpRight className="w-4 h-4 text-gray-400" />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden h-fit">
                            <div className="px-8 py-6 border-b border-gray-50">
                                <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                            </div>
                            <div className="p-8 grid grid-cols-1 gap-4">
                                <button className="flex items-center space-x-4 p-4 rounded-2xl border border-gray-100 hover:bg-primary-50 hover:border-primary-100 transition-all text-left group">
                                    <div className="p-3 rounded-xl bg-primary-100 text-primary-600 group-hover:scale-110 transition-transform">
                                        <Plus className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-gray-700">Add New User</span>
                                </button>
                                <button className="flex items-center space-x-4 p-4 rounded-2xl border border-gray-100 hover:bg-emerald-50 hover:border-emerald-100 transition-all text-left group">
                                    <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600 group-hover:scale-110 transition-transform">
                                        <Package className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-gray-700">Create Product</span>
                                </button>
                                <button className="flex items-center space-x-4 p-4 rounded-2xl border border-gray-100 hover:bg-amber-50 hover:border-amber-100 transition-all text-left group">
                                    <div className="p-3 rounded-xl bg-amber-100 text-amber-600 group-hover:scale-110 transition-transform">
                                        <BarChart3 className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-gray-700">View Analytics</span>
                                </button>
                                <button className="flex items-center space-x-4 p-4 rounded-2xl border border-gray-100 hover:bg-violet-50 hover:border-violet-100 transition-all text-left group">
                                    <div className="p-3 rounded-xl bg-violet-100 text-violet-600 group-hover:scale-110 transition-transform">
                                        <Settings className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-gray-700">Panel Settings</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default Dashboard;
