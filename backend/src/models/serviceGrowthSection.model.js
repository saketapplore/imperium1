const mongoose = require('mongoose');

const serviceGrowthSectionSchema = new mongoose.Schema(
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

const ServiceGrowthSection = mongoose.model('ServiceGrowthSection', serviceGrowthSectionSchema);

module.exports = ServiceGrowthSection;
