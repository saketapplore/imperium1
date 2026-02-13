const HomeHero = require('../models/homeHero.model');
const CoreOffering = require('../models/coreOffering.model');
const AboutUs = require('../models/aboutUs.model');
const Leadership = require('../models/leadership.model');
const Service = require('../models/service.model');
const FocusedCategory = require('../models/focusedCategory.model');
const HomeImageSection = require('../models/homeImageSection.model');
const HomeServiceSection = require('../models/homeServiceSection.model');
const ServiceGrowthSection = require('../models/serviceGrowthSection.model');
const ServiceHero = require('../models/serviceHero.model');
const AboutImages = require('../models/aboutImages.model');
const ContactContent = require('../models/contactContent.model');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * Public Content API - No authentication required
 * For website to fetch and display content
 */

// Get home page content (hero + core offerings)
const getHomeContent = async (req, res, next) => {
    try {
        const [hero, offerings, imageSection, serviceSection] = await Promise.all([
            HomeHero.findOne({ isActive: true }),
            CoreOffering.find({ isVisible: true }).sort({ displayOrder: 1 }),
            HomeImageSection.findOne({ isActive: true }),
            HomeServiceSection.findOne({ isActive: true })
        ]);

        sendSuccess(res, 200, 'Home content retrieved successfully', {
            hero,
            offerings,
            imageSection,
            serviceSection,
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
        const images = await AboutImages.findOne();

        sendSuccess(res, 200, 'About content retrieved successfully', {
            about,
            leadership,
            images
        });
    } catch (error) {
        next(error);
    }
};

// Get services content
const getServicesContent = async (req, res, next) => {
    try {
        const [services, focusedCategories, growthSection, hero] = await Promise.all([
            Service.find({ isVisible: true }).sort({ displayOrder: 1 }),
            FocusedCategory.find({ isVisible: true }).sort({ displayOrder: 1 }),
            ServiceGrowthSection.findOne({ isActive: true }),
            ServiceHero.findOne()
        ]);

        sendSuccess(res, 200, 'Services retrieved successfully', {
            count: services.length,
            services,
            focusedCategories,
            growthSection,
            hero
        });
    } catch (error) {
        next(error);
    }
};

// Get contact page content
const getContactContent = async (req, res, next) => {
    try {
        const contact = await ContactContent.findOne();
        sendSuccess(res, 200, 'Contact content retrieved successfully', { contact });
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
        const [hero, offerings, imageSection, serviceSection, about, leadership, services, focusedCategories, growthSection, serviceHero, aboutImages, contact] = await Promise.all([
            HomeHero.findOne({ isActive: true }),
            CoreOffering.find({ isVisible: true }).sort({ displayOrder: 1 }),
            HomeImageSection.findOne({ isActive: true }),
            HomeServiceSection.findOne({ isActive: true }),
            AboutUs.findOne(),
            Leadership.find({ isVisible: true }).sort({ displayOrder: 1 }),
            Service.find({ isVisible: true }).sort({ displayOrder: 1 }),
            FocusedCategory.find({ isVisible: true }).sort({ displayOrder: 1 }),
            ServiceGrowthSection.findOne({ isActive: true }),
            ServiceHero.findOne(),
            AboutImages.findOne(),
            ContactContent.findOne()
        ]);

        sendSuccess(res, 200, 'All content retrieved successfully', {
            home: {
                hero,
                offerings,
                imageSection,
                serviceSection,
            },
            about: {
                ...about?._doc,
                leadership,
                images: aboutImages
            },
            services: {
                list: services,
                focusedCategories,
                growthSection,
                hero: serviceHero
            },
            contact
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getHomeContent,
    getAboutContent,
    getServicesContent,
    getContactContent,
    getServiceById,
    getAllContent,
};
