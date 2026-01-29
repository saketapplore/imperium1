const Leadership = require('../models/leadership.model');
const { sendSuccess, sendError } = require('../utils/response');

// Get all leadership profiles
const getAllLeadership = async (req, res, next) => {
    try {
        const leadership = await Leadership.find().sort({ displayOrder: 1 });

        sendSuccess(res, 200, 'Leadership profiles retrieved successfully', {
            count: leadership.length,
            leadership,
        });
    } catch (error) {
        next(error);
    }
};

// Get single leadership profile
const getLeadershipById = async (req, res, next) => {
    try {
        const leader = await Leadership.findById(req.params.id);

        if (!leader) {
            return sendError(res, 404, 'Leadership profile not found');
        }

        sendSuccess(res, 200, 'Leadership profile retrieved successfully', { leader });
    } catch (error) {
        next(error);
    }
};

// Create new leadership profile
const createLeadership = async (req, res, next) => {
    try {
        const leader = await Leadership.create(req.body);

        sendSuccess(res, 201, 'Leadership profile created successfully', { leader });
    } catch (error) {
        next(error);
    }
};

// Update leadership profile
const updateLeadership = async (req, res, next) => {
    try {
        const leader = await Leadership.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!leader) {
            return sendError(res, 404, 'Leadership profile not found');
        }

        sendSuccess(res, 200, 'Leadership profile updated successfully', { leader });
    } catch (error) {
        next(error);
    }
};

// Delete leadership profile
const deleteLeadership = async (req, res, next) => {
    try {
        const leader = await Leadership.findByIdAndDelete(req.params.id);

        if (!leader) {
            return sendError(res, 404, 'Leadership profile not found');
        }

        sendSuccess(res, 200, 'Leadership profile deleted successfully');
    } catch (error) {
        next(error);
    }
};

// Toggle visibility
const toggleVisibility = async (req, res, next) => {
    try {
        const leader = await Leadership.findById(req.params.id);

        if (!leader) {
            return sendError(res, 404, 'Leadership profile not found');
        }

        leader.isVisible = !leader.isVisible;
        await leader.save();

        sendSuccess(res, 200, 'Visibility toggled successfully', { leader });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllLeadership,
    getLeadershipById,
    createLeadership,
    updateLeadership,
    deleteLeadership,
    toggleVisibility,
};
