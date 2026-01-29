const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
        },
        company: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            lowercase: true,
            trim: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email',
            ],
        },
        phoneNumber: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
            trim: true,
        },
        serviceSelected: {
            type: String,
            required: [true, 'Please select a service'],
        },
        projectRequirements: {
            type: String,
            trim: true,
        },
        message: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            enum: ['New', 'In Review', 'Closed'],
            default: 'New',
        },
        internalNotes: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
