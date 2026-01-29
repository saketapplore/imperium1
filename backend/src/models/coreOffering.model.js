const mongoose = require('mongoose');

const coreOfferingSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a title'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please provide a description'],
            trim: true,
        },
        icon: {
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
    },
    {
        timestamps: true,
    }
);

const CoreOffering = mongoose.model('CoreOffering', coreOfferingSchema);

module.exports = CoreOffering;
