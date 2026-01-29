const mongoose = require('mongoose');

const leadershipSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide name'],
            trim: true,
        },
        designation: {
            type: String,
            required: [true, 'Please provide designation'],
            trim: true,
        },
        bio: {
            type: String,
            required: [true, 'Please provide bio'],
            trim: true,
        },
        photo: {
            type: String,
            default: '',
        },
        displayOrder: {
            type: Number,
            default: 0,
        },
        isVisible: {
            type: Boolean,
            default: true,
        },
        socialLinks: {
            linkedin: {
                type: String,
                default: '',
            },
            twitter: {
                type: String,
                default: '',
            },
            email: {
                type: String,
                default: '',
            },
        },
    },
    {
        timestamps: true,
    }
);

const Leadership = mongoose.model('Leadership', leadershipSchema);

module.exports = Leadership;
