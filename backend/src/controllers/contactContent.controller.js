const ContactContent = require('../models/contactContent.model');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * @route   GET /api/admin/content/contact
 * @desc    Get contact page content
 * @access  Private/Admin
 */
const getContactContent = async (req, res, next) => {
    try {
        let content = await ContactContent.findOne();

        if (!content) {
            content = await ContactContent.create({
                image: '/images/contact1.png'
            });
        }

        sendSuccess(res, 200, 'Contact content retrieved successfully', { content });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   PUT /api/admin/content/contact
 * @desc    Update contact page content
 * @access  Private/Admin
 */
const updateContactContent = async (req, res, next) => {
    try {
        let content = await ContactContent.findOne();

        if (!content) {
            content = await ContactContent.create(req.body);
        } else {
            content = await ContactContent.findOneAndUpdate({}, req.body, { new: true });
        }

        sendSuccess(res, 200, 'Contact content updated successfully', { content });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getContactContent,
    updateContactContent,
};
