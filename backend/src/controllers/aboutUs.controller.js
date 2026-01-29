const AboutUs = require('../models/aboutUs.model');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * @route   GET /api/admin/content/about-us
 * @desc    Get about us content
 * @access  Private/Admin
 */
const getAboutUs = async (req, res, next) => {
    try {
        let about = await AboutUs.findOne();

        // If no content exists, create default
        if (!about) {
            about = await AboutUs.create({
                companyOverview: 'Company overview text here',
                philosophyStatement: 'Philosophy statement here',
            });
        }

        sendSuccess(res, 200, 'About us content retrieved successfully', { about });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   PUT /api/admin/content/about-us
 * @desc    Update about us content
 * @access  Private/Admin
 */
const updateAboutUs = async (req, res, next) => {
    try {
        let about = await AboutUs.findOne();

        if (!about) {
            about = await AboutUs.create(req.body);
        } else {
            Object.assign(about, req.body);
            await about.save();
        }

        sendSuccess(res, 200, 'About us content updated successfully', { about });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAboutUs,
    updateAboutUs,
};
