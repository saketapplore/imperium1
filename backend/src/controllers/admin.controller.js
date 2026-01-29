const { generateToken } = require('../utils/jwt');
const { sendSuccess, sendError } = require('../utils/response');
const Admin = require('../models/admin.model');
const { sendPasswordResetEmail } = require('../services/email.service');
const crypto = require('crypto');

// Hardcoded admin credentials (fallback)
const ADMIN_CREDENTIALS = {
    email: 'saket.kakkar@applore.in',
    password: 'saket123',
    name: 'Admin',
    role: 'admin',
    id: 'admin-001',
};

/**
 * @route   POST /api/admin/login
 * @desc    Admin login with database or hardcoded credentials
 * @access  Public
 */
const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return sendError(res, 400, 'Please provide email and password');
        }

        // First try to find admin in database
        let admin = await Admin.findOne({ email }).select('+password');

        if (admin) {
            // Database admin found
            const isPasswordCorrect = await admin.comparePassword(password);

            if (!isPasswordCorrect) {
                return sendError(res, 401, 'Invalid email or password');
            }

            // Update last login
            admin.lastLogin = new Date();
            await admin.save();

            // Generate JWT token
            const token = generateToken({
                id: admin._id,
                email: admin.email,
                role: admin.role,
            });

            // Remove password from response
            admin.password = undefined;

            return sendSuccess(res, 200, 'Admin login successful', {
                admin,
                token,
            });
        }

        // Fallback to hardcoded credentials
        if (
            email !== ADMIN_CREDENTIALS.email ||
            password !== ADMIN_CREDENTIALS.password
        ) {
            return sendError(res, 401, 'Invalid email or password');
        }

        // Generate JWT token for hardcoded admin
        const token = generateToken({
            id: ADMIN_CREDENTIALS.id,
            email: ADMIN_CREDENTIALS.email,
            role: ADMIN_CREDENTIALS.role,
        });

        // Admin data to return
        const adminData = {
            id: ADMIN_CREDENTIALS.id,
            name: ADMIN_CREDENTIALS.name,
            email: ADMIN_CREDENTIALS.email,
            role: ADMIN_CREDENTIALS.role,
        };

        sendSuccess(res, 200, 'Admin login successful', {
            admin: adminData,
            token,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/admin/profile
 * @desc    Get admin profile
 * @access  Private/Admin
 */
const getAdminProfile = async (req, res, next) => {
    try {
        // Check if the authenticated user is admin
        if (req.user.role !== 'admin') {
            return sendError(res, 403, 'Access denied. Admin only.');
        }

        // Try to get from database first
        const admin = await Admin.findById(req.user.id);

        if (admin) {
            return sendSuccess(res, 200, 'Admin profile retrieved successfully', {
                admin,
            });
        }

        // Fallback to hardcoded credentials
        const adminData = {
            id: ADMIN_CREDENTIALS.id,
            name: ADMIN_CREDENTIALS.name,
            email: ADMIN_CREDENTIALS.email,
            role: ADMIN_CREDENTIALS.role,
        };

        sendSuccess(res, 200, 'Admin profile retrieved successfully', {
            admin: adminData,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/admin/forgot-password
 * @desc    Request password reset email
 * @access  Public
 */
const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return sendError(res, 400, 'Please provide an email address');
        }

        // Find admin by email
        let admin = await Admin.findOne({ email });

        // If admin doesn't exist in database but matches hardcoded email, create one
        if (!admin && email === ADMIN_CREDENTIALS.email) {
            admin = await Admin.create({
                name: ADMIN_CREDENTIALS.name,
                email: ADMIN_CREDENTIALS.email,
                password: ADMIN_CREDENTIALS.password,
                role: 'admin',
            });
        }

        if (!admin) {
            // Don't reveal that the email doesn't exist (security best practice)
            return sendSuccess(
                res,
                200,
                'If an account exists with this email, a password reset link has been sent'
            );
        }

        // Generate reset token
        const resetToken = admin.generateResetToken();
        await admin.save({ validateBeforeSave: false });

        // Create reset URL
        const resetUrl = `${process.env.CLIENT_URL}/admin/reset-password/${resetToken}`;

        try {
            // Send email
            await sendPasswordResetEmail(email, resetToken, resetUrl);

            sendSuccess(
                res,
                200,
                'Password reset email sent successfully. Please check your inbox.'
            );
        } catch (error) {
            // If email fails, remove reset token
            admin.resetPasswordToken = undefined;
            admin.resetPasswordExpire = undefined;
            await admin.save({ validateBeforeSave: false });

            return sendError(
                res,
                500,
                'Failed to send password reset email. Please try again later.'
            );
        }
    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/admin/reset-password/:resetToken
 * @desc    Reset password using token
 * @access  Public
 */
const resetPassword = async (req, res, next) => {
    try {
        const { resetToken } = req.params;
        const { password } = req.body;

        if (!password) {
            return sendError(res, 400, 'Please provide a new password');
        }

        if (password.length < 6) {
            return sendError(
                res,
                400,
                'Password must be at least 6 characters long'
            );
        }

        // Hash token to compare with database
        const hashedToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // Find admin with valid token
        const admin = await Admin.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() },
        }).select('+resetPasswordToken +resetPasswordExpire');

        if (!admin) {
            return sendError(
                res,
                400,
                'Invalid or expired reset token. Please request a new password reset.'
            );
        }

        // Set new password
        admin.password = password;
        admin.resetPasswordToken = undefined;
        admin.resetPasswordExpire = undefined;
        await admin.save();

        // Generate new JWT token
        const token = generateToken({
            id: admin._id,
            email: admin.email,
            role: admin.role,
        });

        sendSuccess(res, 200, 'Password reset successful. You can now login.', {
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
            token,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/admin/logout
 * @desc    Logout admin
 * @access  Private/Admin
 */
const logoutAdmin = async (req, res, next) => {
    try {
        // Since we are using stateless JWT, we don't necessarily need to do anything on the server
        // however, if we were using cookies or a token blacklist, we would handle it here.
        // For now, we just return a success message.
        sendSuccess(res, 200, 'Logout successful');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    adminLogin,
    getAdminProfile,
    forgotPassword,
    resetPassword,
    logoutAdmin,
};
