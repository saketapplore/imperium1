const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpire } = require('../config/env');

/**
 * Generate JWT token
 * @param {Object} payload - Data to encode in token
 * @returns {String} JWT token
 */
const generateToken = (payload) => {
    return jwt.sign(payload, jwtSecret, {
        expiresIn: jwtExpire,
    });
};

/**
 * Verify JWT token
 * @param {String} token - JWT token to verify
 * @returns {Object} Decoded token payload
 */
const verifyToken = (token) => {
    try {
        return jwt.verify(token, jwtSecret);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

/**
 * Generate token for user
 * @param {Object} user - User object
 * @returns {String} JWT token
 */
const generateUserToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };
    return generateToken(payload);
};

module.exports = {
    generateToken,
    verifyToken,
    generateUserToken,
};
