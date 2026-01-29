const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide service title'],
            trim: true,
        },
        shortSummary: {
            type: String,
            required: [true, 'Please provide short summary'],
            trim: true,
        },
        detailedDescription: {
            type: String,
            required: [true, 'Please provide detailed description'],
            trim: true,
        },
        icon: {
            type: String,
            default: '',
        },
        image: {
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
        features: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
