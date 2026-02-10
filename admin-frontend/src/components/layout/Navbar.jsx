import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
    Bell,
    Search,
    Menu,
    User as UserIcon,
    ChevronDown,
    Settings,
    LogOut
} from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex justify-between items-center h-16 w-full">
                {/* Left: Mobile Menu */}
                <div className="flex items-center flex-1">
                    <button className="md:hidden p-2 rounded-lg text-gray-400 hover:bg-gray-100">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                {/* Right: Notifications & Profile */}
                <div className="flex items-center space-x-4">
                    <button className="relative p-2 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>

                    <div className="h-8 w-px bg-gray-200 mx-2"></div>

                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center space-x-3 p-1 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary-600/20">
                                {user?.name?.charAt(0) || user?.email?.charAt(0) || 'A'}
                            </div>
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-bold text-gray-900 leading-none">{user?.name || 'Admin User'}</p>
                                <p className="text-xs text-gray-500 mt-1 uppercase tracking-tighter">Super Admin</p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>

                        {/* Dropdown Menu */}
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-slide-in">
                                <div className="px-4 py-3 border-b border-gray-50">
                                    <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</p>
                                    <p className="text-xs text-gray-500 truncate">{user?.email || 'admin@imperium.com'}</p>
                                </div>
                                <div className="p-2">
                                    <button className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                                        <UserIcon className="w-4 h-4" />
                                        <span>My Profile</span>
                                    </button>
                                    <button className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                                        <Settings className="w-4 h-4" />
                                        <span>Settings</span>
                                    </button>
                                </div>
                                <div className="p-2 border-t border-gray-50">
                                    <button
                                        onClick={logout}
                                        className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
