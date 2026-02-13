const ServiceHero = require('../models/serviceHero.model');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * @route   GET /api/admin/content/service-hero
 * @desc    Get services page hero content
 * @access  Private/Admin
 */
const getServiceHero = async (req, res, next) => {
    try {
        let hero = await ServiceHero.findOne();

        if (!hero) {
            hero = await ServiceHero.create({
                subheading: 'Our services',
                headingMain: 'Strategic Solutions for',
                headingAccent: 'Global Expansion',
                description: 'We deliver structured, compliant international trade and distribution solutions that protect brand value and enable sustainable global growth.'
            });
        }

        sendSuccess(res, 200, 'Service hero retrieved successfully', { hero });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   PUT /api/admin/content/service-hero
 * @desc    Update services page hero content
 * @access  Private/Admin
 */
const updateServiceHero = async (req, res, next) => {
    try {
        let hero = await ServiceHero.findOne();

        if (!hero) {
            hero = await ServiceHero.create(req.body);
        } else {
            hero = await ServiceHero.findOneAndUpdate({}, req.body, { new: true });
        }

        sendSuccess(res, 200, 'Service hero updated successfully', { hero });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getServiceHero,
    updateServiceHero,
};
