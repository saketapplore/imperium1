const mongoose = require('mongoose');

const homeHeroSchema = new mongoose.Schema(
    {
        headline: {
            type: String,
            required: [true, 'Please provide a headline'],
            trim: true,
        },
        subtext: {
            type: String,
            required: [true, 'Please provide subtext'],
            trim: true,
        },
        primaryCTA: {
            text: {
                type: String,
                required: true,
                default: 'Get Started',
            },
            link: {
                type: String,
                required: true,
                default: '#',
            },
        },
        secondaryCTA: {
            text: {
                type: String,
                default: 'Learn More',
            },
            link: {
                type: String,
                default: '#',
            },
        },
        backgroundImage: {
            type: String,
            default: '',
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

const HomeHero = mongoose.model('HomeHero', homeHeroSchema);

module.exports = HomeHero;
