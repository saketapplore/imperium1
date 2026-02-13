const mongoose = require('mongoose');

const homeServiceSectionSchema = new mongoose.Schema(
    {
        sideImage: {
            type: String,
            required: [true, 'Please provide an image URL'],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const HomeServiceSection = mongoose.model('HomeServiceSection', homeServiceSectionSchema);

module.exports = HomeServiceSection;
