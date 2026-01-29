import { useAuth } from '../../hooks/useAuth';
import {
    Users,
    Package,
    ShoppingCart,
    DollarSign,
    Plus,
    BarChart3,
    ArrowUpRight
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
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-1 font-medium">Welcome back, {user?.name || 'Admin'}!</p>
                </div>
                <button className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20 font-bold active:scale-95">
                    <Plus className="w-4 h-4" />
                    <span>Generate Report</span>
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.title} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-lg">
                                    {stat.trend}
                                </span>
                            </div>
                            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-widest">{stat.title}</h3>
                            <p className="text-3xl font-black text-gray-900 mt-1">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-black text-gray-900 tracking-tight">Recent Activity</h3>
                        <button className="text-primary-600 text-sm font-bold hover:underline">View all</button>
                    </div>
                    <div className="space-y-6">
                        {recentActivities.map((activity) => {
                            const Icon = activity.icon;
                            return (
                                <div key={activity.id} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center space-x-4">
                                        <div className={`p-3 rounded-xl ${activity.bg} ${activity.color}`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                                                {activity.action}
                                            </p>
                                            <p className="text-xs text-gray-500 font-medium mt-0.5">{activity.time}</p>
                                        </div>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600 transition-colors" />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Quick Actions / Integration */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-xl">
                    <h3 className="text-xl font-black mb-6 tracking-tight flex items-center">
                        <BarChart3 className="w-6 h-6 mr-3 text-primary-400" />
                        System Status
                    </h3>
                    <div className="space-y-6">
                        <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400 font-bold">Server Load</span>
                                <span className="text-emerald-400 font-bold">Normal</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[35%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                            </div>
                        </div>
                        <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400 font-bold">API Requests</span>
                                <span className="text-primary-400 font-bold">High</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-primary-500 w-[78%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                            </div>
                        </div>
                    </div>
                    <button className="w-full mt-8 py-4 bg-white text-gray-900 rounded-2xl font-black text-sm hover:bg-gray-100 transition-all active:scale-95">
                        Refresh Diagnostics
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
