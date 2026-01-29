const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema(
    {
        companyOverview: {
            type: String,
            required: [true, 'Please provide company overview'],
            trim: true,
        },
        philosophyStatement: {
            type: String,
            required: [true, 'Please provide philosophy statement'],
            trim: true,
        },
        missionStatement: {
            type: String,
            default: '',
        },
        visionStatement: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

const AboutUs = mongoose.model('AboutUs', aboutUsSchema);

module.exports = AboutUs;
