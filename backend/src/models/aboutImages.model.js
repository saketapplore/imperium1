const mongoose = require('mongoose');

const aboutImagesSchema = new mongoose.Schema(
    {
        topImage: {
            type: String,
            default: '/images/about2.png'
        },
        bottomImage: {
            type: String,
            default: '/images/about3.png'
        }
    },
    {
        timestamps: true,
    }
);

const AboutImages = mongoose.model('AboutImages', aboutImagesSchema);

module.exports = AboutImages;
