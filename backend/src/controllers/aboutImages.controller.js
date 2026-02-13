const AboutImages = require('../models/aboutImages.model');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * @route   GET /api/admin/content/about-images
 * @desc    Get about page images
 * @access  Private/Admin
 */
const getAboutImages = async (req, res, next) => {
    try {
        let images = await AboutImages.findOne();

        if (!images) {
            images = await AboutImages.create({
                topImage: '/images/about2.png',
                bottomImage: '/images/about3.png'
            });
        }

        sendSuccess(res, 200, 'About images retrieved successfully', { images });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   PUT /api/admin/content/about-images
 * @desc    Update about page images
 * @access  Private/Admin
 */
const updateAboutImages = async (req, res, next) => {
    try {
        let images = await AboutImages.findOne();

        if (!images) {
            images = await AboutImages.create(req.body);
        } else {
            images = await AboutImages.findOneAndUpdate({}, req.body, { new: true });
        }

        sendSuccess(res, 200, 'About images updated successfully', { images });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAboutImages,
    updateAboutImages,
};
