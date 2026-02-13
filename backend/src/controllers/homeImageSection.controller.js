const HomeImageSection = require('../models/homeImageSection.model');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * @route   GET /api/admin/content/home-image-section
 * @desc    Get home image section content
 * @access  Private/Admin
 */
const getHomeImageSection = async (req, res, next) => {
    try {
        let section = await HomeImageSection.findOne();

        if (!section) {
            section = await HomeImageSection.create({
                image: '',
                isActive: true
            });
        }

        sendSuccess(res, 200, 'Home image section retrieved successfully', { section });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   PUT /api/admin/content/home-image-section
 * @desc    Update home image section content
 * @access  Private/Admin
 */
const updateHomeImageSection = async (req, res, next) => {
    try {
        const { image, isActive } = req.body;

        let section = await HomeImageSection.findOne();

        if (!section) {
            section = await HomeImageSection.create(req.body);
        } else {
            if (image !== undefined) section.image = image;
            if (isActive !== undefined) section.isActive = isActive;

            await section.save();
        }

        sendSuccess(res, 200, 'Home image section updated successfully', { section });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getHomeImageSection,
    updateHomeImageSection,
};
