require('dotenv').config();
const mongoose = require('mongoose');
const HomeHero = require('../src/models/homeHero.model');

const seedHero = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing hero content
        await HomeHero.deleteMany({});
        console.log('Cleared existing hero content');

        const heroData = {
            headline: 'Tailored Solutions for\nGlobal Growth.',
            subtext: 'Bespoke Private Labels, Global Trade Expertise, and\nStrategic Market Expansion.',
            primaryCTA: {
                text: 'Explore Solutions',
                link: '/services',
            },
            secondaryCTA: {
                text: 'Contact us',
                link: '/contact',
            },
            backgroundImage: '/images/ihome1.png',
            isActive: true
        };

        await HomeHero.create(heroData);
        console.log('Home hero content seeded successfully');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding hero content:', error);
        process.exit(1);
    }
};

seedHero();
