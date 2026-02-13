const mongoose = require('mongoose');

const homeImageSectionSchema = new mongoose.Schema(
    {
        image: {
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

const HomeImageSection = mongoose.model('HomeImageSection', homeImageSectionSchema);

module.exports = HomeImageSection;
