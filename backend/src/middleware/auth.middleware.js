const { verifyToken } = require('../utils/jwt');
const { sendError } = require('../utils/response');
const Admin = require('../models/admin.model');

/**
 * Protect routes - Verify JWT token
 */
const protect = async (req, res, next) => {
    try {
        let token;

        // Check for token in Authorization header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        // Check if token exists
        if (!token) {
            return sendError(
                res,
                401,
                'Not authorized to access this route. Please provide a valid token.'
            );
        }

        try {
            // Verify token
            const decoded = verifyToken(token);

            // Get user from token (exclude password)
            const user = await Admin.findById(decoded.id).select('-password');

            if (!user) {
                return sendError(res, 401, 'User not found');
            }

            if (!user.isActive) {
                return sendError(res, 401, 'User account is deactivated');
            }

            // Attach user to request object
            req.user = user;
            next();
        } catch (error) {
            return sendError(res, 401, 'Invalid or expired token');
        }
    } catch (error) {
        return sendError(res, 500, 'Server error during authentication');
    }
};

/**
 * Check if user has required role
 * @param  {...String} roles - Allowed roles
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return sendError(res, 401, 'Not authenticated');
        }

        if (!roles.includes(req.user.role)) {
            return sendError(
                res,
                403,
                `User role '${req.user.role}' is not authorized to access this route`
            );
        }

        next();
    };
};

module.exports = {
    protect,
    authorize,
};
