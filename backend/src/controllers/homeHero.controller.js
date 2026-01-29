const HomeHero = require('../models/homeHero.model');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * @route   GET /api/admin/content/home-hero
 * @desc    Get home hero content
 * @access  Private/Admin
 */
const getHomeHero = async (req, res, next) => {
    try {
        let hero = await HomeHero.findOne();

        // If no hero exists, create default
        if (!hero) {
            hero = await HomeHero.create({
                headline: 'Welcome to Imperium',
                subtext: 'Your trusted partner in excellence',
                primaryCTA: {
                    text: 'Get Started',
                    link: '#contact',
                },
                secondaryCTA: {
                    text: 'Learn More',
                    link: '#about',
                },
            });
        }

        sendSuccess(res, 200, 'Home hero content retrieved successfully', { hero });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   PUT /api/admin/content/home-hero
 * @desc    Update home hero content
 * @access  Private/Admin
 */
const updateHomeHero = async (req, res, next) => {
    try {
        const { headline, subtext, primaryCTA, secondaryCTA, backgroundImage, isActive } = req.body;

        let hero = await HomeHero.findOne();

        if (!hero) {
            // Create new if doesn't exist
            hero = await HomeHero.create(req.body);
        } else {
            // Update existing
            if (headline !== undefined) hero.headline = headline;
            if (subtext !== undefined) hero.subtext = subtext;
            if (primaryCTA !== undefined) hero.primaryCTA = primaryCTA;
            if (secondaryCTA !== undefined) hero.secondaryCTA = secondaryCTA;
            if (backgroundImage !== undefined) hero.backgroundImage = backgroundImage;
            if (isActive !== undefined) hero.isActive = isActive;

            await hero.save();
        }

        sendSuccess(res, 200, 'Home hero content updated successfully', { hero });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getHomeHero,
    updateHomeHero,
};
