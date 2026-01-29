import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Package,
    ShoppingCart,
    Settings,
    Shield,
    LogOut
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
    const location = useLocation();
    const { logout } = useAuth();

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/users', label: 'Users', icon: Users },
        { path: '/products', label: 'Products', icon: Package },
        { path: '/orders', label: 'Orders', icon: ShoppingCart },
        { path: '/settings', label: 'Settings', icon: Settings },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <aside className="bg-gray-900 text-white w-64 min-h-screen hidden md:flex flex-col">
            <div className="p-6 border-b border-gray-800">
                <div className="flex items-center space-x-2">
                    <Shield className="w-8 h-8 text-primary-500" />
                    <span className="text-xl font-bold tracking-tight">IMPERIUM</span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto mt-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive(item.path)
                                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-primary-400'
                                }`} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={logout}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-200 w-full group"
                >
                    <LogOut className="w-5 h-5 group-hover:scale-110" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
