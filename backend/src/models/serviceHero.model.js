const mongoose = require('mongoose');

const serviceHeroSchema = new mongoose.Schema(
    {
        subheading: {
            type: String,
            default: 'Our services'
        },
        headingMain: {
            type: String,
            default: 'Strategic Solutions for'
        },
        headingAccent: {
            type: String,
            default: 'Global Expansion'
        },
        description: {
            type: String,
            default: 'We deliver structured, compliant international trade and distribution solutions that protect brand value and enable sustainable global growth.'
        }
    },
    {
        timestamps: true,
    }
);

const ServiceHero = mongoose.model('ServiceHero', serviceHeroSchema);

module.exports = ServiceHero;
