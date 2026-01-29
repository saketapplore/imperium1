import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = () => {
    return (
        <div className="h-screen flex flex-col overflow-hidden bg-gray-50/50">
            {/* Header - Fixed on top */}
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar - Fixed on left */}
                <Sidebar />

                {/* Main Content - Scrollable */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8 animate-fade-in">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
