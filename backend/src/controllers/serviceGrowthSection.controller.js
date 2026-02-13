const ServiceGrowthSection = require('../models/serviceGrowthSection.model');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * @route   GET /api/admin/content/service-growth-section
 * @desc    Get service growth section content
 * @access  Private/Admin
 */
const getServiceGrowthSection = async (req, res, next) => {
    try {
        let section = await ServiceGrowthSection.findOne();

        if (!section) {
            section = await ServiceGrowthSection.create({
                image: '/images/service21.png',
                isActive: true
            });
        }

        sendSuccess(res, 200, 'Service growth section retrieved successfully', { section });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   PUT /api/admin/content/service-growth-section
 * @desc    Update service growth section content
 * @access  Private/Admin
 */
const updateServiceGrowthSection = async (req, res, next) => {
    try {
        const { image, isActive } = req.body;

        let section = await ServiceGrowthSection.findOne();

        if (!section) {
            section = await ServiceGrowthSection.create(req.body);
        } else {
            if (image !== undefined) section.image = image;
            if (isActive !== undefined) section.isActive = isActive;

            await section.save();
        }

        sendSuccess(res, 200, 'Service growth section updated successfully', { section });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getServiceGrowthSection,
    updateServiceGrowthSection,
};
