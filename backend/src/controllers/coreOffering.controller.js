const CoreOffering = require('../models/coreOffering.model');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * @route   GET /api/admin/content/core-offerings
 * @desc    Get all core offerings
 * @access  Private/Admin
 */
const getAllOfferings = async (req, res, next) => {
    try {
        const offerings = await CoreOffering.find().sort({ displayOrder: 1 });

        sendSuccess(res, 200, 'Core offerings retrieved successfully', {
            count: offerings.length,
            offerings,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/admin/content/core-offerings/:id
 * @desc    Get single core offering
 * @access  Private/Admin
 */
const getOfferingById = async (req, res, next) => {
    try {
        const offering = await CoreOffering.findById(req.params.id);

        if (!offering) {
            return sendError(res, 404, 'Core offering not found');
        }

        sendSuccess(res, 200, 'Core offering retrieved successfully', { offering });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/admin/content/core-offerings
 * @desc    Create new core offering
 * @access  Private/Admin
 */
const createOffering = async (req, res, next) => {
    try {
        const offering = await CoreOffering.create(req.body);

        sendSuccess(res, 201, 'Core offering created successfully', { offering });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   PUT /api/admin/content/core-offerings/:id
 * @desc    Update core offering
 * @access  Private/Admin
 */
const updateOffering = async (req, res, next) => {
    try {
        const offering = await CoreOffering.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!offering) {
            return sendError(res, 404, 'Core offering not found');
        }

        sendSuccess(res, 200, 'Core offering updated successfully', { offering });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   DELETE /api/admin/content/core-offerings/:id
 * @desc    Delete core offering
 * @access  Private/Admin
 */
const deleteOffering = async (req, res, next) => {
    try {
        const offering = await CoreOffering.findByIdAndDelete(req.params.id);

        if (!offering) {
            return sendError(res, 404, 'Core offering not found');
        }

        sendSuccess(res, 200, 'Core offering deleted successfully');
    } catch (error) {
        next(error);
    }
};

/**
 * @route   PATCH /api/admin/content/core-offerings/:id/toggle-visibility
 * @desc    Toggle offering visibility
 * @access  Private/Admin
 */
const toggleVisibility = async (req, res, next) => {
    try {
        const offering = await CoreOffering.findById(req.params.id);

        if (!offering) {
            return sendError(res, 404, 'Core offering not found');
        }

        offering.isVisible = !offering.isVisible;
        await offering.save();

        sendSuccess(res, 200, 'Visibility toggled successfully', { offering });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllOfferings,
    getOfferingById,
    createOffering,
    updateOffering,
    deleteOffering,
    toggleVisibility,
};
