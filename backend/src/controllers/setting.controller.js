const GlobalSetting = require('../models/globalSetting.model');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * @desc    Get global settings
 * @route   GET /api/admin/settings
 * @access  Private/Admin
 */
exports.getSettings = async (req, res, next) => {
    try {
        let settings = await GlobalSetting.findOne();

        if (!settings) {
            // Create default settings if not exists
            settings = await GlobalSetting.create({});
        }

        sendSuccess(res, 200, 'Settings retrieved successfully', settings);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update notification emails
 * @route   PUT /api/admin/settings/notifications
 * @access  Private/Admin
 */
exports.updateNotificationEmails = async (req, res, next) => {
    try {
        const { notificationEmails } = req.body;

        if (!notificationEmails || !Array.isArray(notificationEmails)) {
            return sendError(res, 400, 'Please provide an array of emails');
        }

        let settings = await GlobalSetting.findOne();
        if (!settings) {
            settings = await GlobalSetting.create({ notificationEmails });
        } else {
            settings.notificationEmails = notificationEmails;
            await settings.save();
        }

        sendSuccess(res, 200, 'Notification emails updated successfully', settings);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update contact details
 * @route   PUT /api/admin/settings/contact
 * @access  Private/Admin
 */
exports.updateContactDetails = async (req, res, next) => {
    try {
        const { contactDetails } = req.body;

        let settings = await GlobalSetting.findOne();
        if (!settings) {
            settings = await GlobalSetting.create({ contactDetails });
        } else {
            settings.contactDetails = { ...settings.contactDetails, ...contactDetails };
            await settings.save();
        }

        sendSuccess(res, 200, 'Contact details updated successfully', settings);
    } catch (error) {
        next(error);
    }
};
