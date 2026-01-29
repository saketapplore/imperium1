const HomeHero = require('../models/homeHero.model');
const CoreOffering = require('../models/coreOffering.model');
const AboutUs = require('../models/aboutUs.model');
const Leadership = require('../models/leadership.model');
const Service = require('../models/service.model');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * Public Content API - No authentication required
 * For website to fetch and display content
 */

// Get home page content (hero + core offerings)
const getHomeContent = async (req, res, next) => {
    try {
        const hero = await HomeHero.findOne({ isActive: true });
        const offerings = await CoreOffering.find({ isVisible: true }).sort({ displayOrder: 1 });

        sendSuccess(res, 200, 'Home content retrieved successfully', {
            hero,
            offerings,
        });
    } catch (error) {
        next(error);
    }
};

// Get about us content (company overview + leadership)
const getAboutContent = async (req, res, next) => {
    try {
        const about = await AboutUs.findOne();
        const leadership = await Leadership.find({ isVisible: true }).sort({ displayOrder: 1 });

        sendSuccess(res, 200, 'About content retrieved successfully', {
            about,
            leadership,
        });
    } catch (error) {
        next(error);
    }
};

// Get services content
const getServicesContent = async (req, res, next) => {
    try {
        const services = await Service.find({ isVisible: true }).sort({ displayOrder: 1 });

        sendSuccess(res, 200, 'Services retrieved successfully', {
            count: services.length,
            services,
        });
    } catch (error) {
        next(error);
    }
};

// Get single service by ID
const getServiceById = async (req, res, next) => {
    try {
        const service = await Service.findOne({ _id: req.params.id, isVisible: true });

        if (!service) {
            return sendError(res, 404, 'Service not found');
        }

        sendSuccess(res, 200, 'Service retrieved successfully', { service });
    } catch (error) {
        next(error);
    }
};

// Get all content at once (for initial page load)
const getAllContent = async (req, res, next) => {
    try {
        const [hero, offerings, about, leadership, services] = await Promise.all([
            HomeHero.findOne({ isActive: true }),
            CoreOffering.find({ isVisible: true }).sort({ displayOrder: 1 }),
            AboutUs.findOne(),
            Leadership.find({ isVisible: true }).sort({ displayOrder: 1 }),
            Service.find({ isVisible: true }).sort({ displayOrder: 1 }),
        ]);

        sendSuccess(res, 200, 'All content retrieved successfully', {
            home: {
                hero,
                offerings,
            },
            about: {
                ...about?._doc,
                leadership,
            },
            services,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getHomeContent,
    getAboutContent,
    getServicesContent,
    getServiceById,
    getAllContent,
};
