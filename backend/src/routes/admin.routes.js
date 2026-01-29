const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// Public routes - Admin login and password reset
router.post('/login', adminController.adminLogin);
router.post('/forgot-password', adminController.forgotPassword);
router.post('/reset-password/:resetToken', adminController.resetPassword);

// Protected routes - Admin only
router.get('/profile', protect, authorize('admin'), adminController.getAdminProfile);
router.post('/logout', protect, authorize('admin'), adminController.logoutAdmin);

module.exports = router;
