import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../components/layout/MainLayout';

// Pages
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import Dashboard from '../pages/Dashboard/Dashboard';
import ContentManagement from '../pages/ContentManagement/ContentManagement';
import Enquiries from '../pages/Enquiries/Enquiries';
import ContactSettings from '../pages/ContactSettings/ContactSettings';
import MediaLibrary from '../pages/MediaLibrary/MediaLibrary';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin/reset-password/:token" element={<ResetPassword />} />

            {/* Protected Routes - Wrapped in MainLayout */}
            <Route element={
                <ProtectedRoute>
                    <MainLayout />
                </ProtectedRoute>
            }>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/content-management" element={<ContentManagement />} />
                <Route path="/enquiries" element={<Enquiries />} />
                <Route path="/contact-settings" element={<ContactSettings />} />
                <Route path="/media-library" element={<MediaLibrary />} />
            </Route>

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
