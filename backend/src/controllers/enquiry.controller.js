const Enquiry = require('../models/enquiry.model');
const GlobalSetting = require('../models/globalSetting.model');
const { sendSuccess, sendError } = require('../utils/response');
const { sendEnquiryNotificationEmail } = require('../services/email.service');

/**
 * @route   GET /api/admin/enquiries
 * @desc    Get all enquiries with search and filter
 * @access  Private/Admin
 */
exports.getAllEnquiries = async (req, res, next) => {
    try {
        const { search, status } = req.query;
        let query = {};

        // Status filter
        if (status && status !== 'All') {
            query.status = status;
        }

        // Search filter
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: 'i' } },
                { message: { $regex: search, $options: 'i' } },
            ];
        }

        const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });

        sendSuccess(res, 200, 'Enquiries retrieved successfully', enquiries);
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/admin/enquiries/:id
 * @desc    Get single enquiry
 * @access  Private/Admin
 */
exports.getEnquiryById = async (req, res, next) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id);

        if (!enquiry) {
            return sendError(res, 404, 'Enquiry not found');
        }

        sendSuccess(res, 200, 'Enquiry retrieved successfully', enquiry);
    } catch (error) {
        next(error);
    }
};

/**
 * @route   PUT /api/admin/enquiries/:id/status
 * @desc    Update enquiry status
 * @access  Private/Admin
 */
exports.updateStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        if (!status) {
            return sendError(res, 400, 'Please provide status');
        }

        const enquiry = await Enquiry.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!enquiry) {
            return sendError(res, 404, 'Enquiry not found');
        }

        sendSuccess(res, 200, 'Enquiry status updated successfully', enquiry);
    } catch (error) {
        next(error);
    }
};

/**
 * @route   PUT /api/admin/enquiries/:id/notes
 * @desc    Update enquiry internal notes
 * @access  Private/Admin
 */
exports.updateNotes = async (req, res, next) => {
    try {
        const { internalNotes } = req.body;

        const enquiry = await Enquiry.findByIdAndUpdate(
            req.params.id,
            { internalNotes },
            { new: true, runValidators: true }
        );

        if (!enquiry) {
            return sendError(res, 404, 'Enquiry not found');
        }

        sendSuccess(res, 200, 'Enquiry notes updated successfully', enquiry);
    } catch (error) {
        next(error);
    }
};

/**
 * @route   DELETE /api/admin/enquiries/:id
 * @desc    Delete enquiry
 * @access  Private/Admin
 */
exports.deleteEnquiry = async (req, res, next) => {
    try {
        const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

        if (!enquiry) {
            return sendError(res, 404, 'Enquiry not found');
        }

        sendSuccess(res, 200, 'Enquiry deleted successfully');
    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/content/enquiry
 * @desc    Create new enquiry (Public)
 * @access  Public
 */
exports.createEnquiry = async (req, res, next) => {
    try {
        const enquiry = await Enquiry.create(req.body);

        // Send email notification to admins
        try {
            let settings = await GlobalSetting.findOne();
            if (!settings) {
                settings = await GlobalSetting.create({});
            }

            const recipients = settings.notificationEmails;
            if (recipients && recipients.length > 0) {
                await sendEnquiryNotificationEmail(recipients, enquiry);
            }
        } catch (emailError) {
            console.error('⚠️ Email Notification Failed:', emailError.message);
            // Don't fail the request if only email fails
        }

        sendSuccess(res, 201, 'Enquiry submitted successfully', enquiry);
    } catch (error) {
        next(error);
    }
};
