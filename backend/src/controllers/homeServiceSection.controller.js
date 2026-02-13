const HomeServiceSection = require('../models/homeServiceSection.model');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * @route   GET /api/admin/content/home-service-section
 * @desc    Get home service section content
 * @access  Private/Admin
 */
const getHomeServiceSection = async (req, res, next) => {
    try {
        let section = await HomeServiceSection.findOne();

        if (!section) {
            section = await HomeServiceSection.create({
                sideImage: '/images/ihome6.png',
                isActive: true
            });
        }

        sendSuccess(res, 200, 'Home service section retrieved successfully', { section });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   PUT /api/admin/content/home-service-section
 * @desc    Update home service section content
 * @access  Private/Admin
 */
const updateHomeServiceSection = async (req, res, next) => {
    try {
        const { sideImage, isActive } = req.body;

        let section = await HomeServiceSection.findOne();

        if (!section) {
            section = await HomeServiceSection.create(req.body);
        } else {
            if (sideImage !== undefined) section.sideImage = sideImage;
            if (isActive !== undefined) section.isActive = isActive;

            await section.save();
        }

        sendSuccess(res, 200, 'Home service section updated successfully', { section });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getHomeServiceSection,
    updateHomeServiceSection,
};
