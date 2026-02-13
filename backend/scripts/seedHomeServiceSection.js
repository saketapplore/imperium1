require('dotenv').config();
const mongoose = require('mongoose');
const HomeServiceSection = require('../src/models/homeServiceSection.model');

const seedHomeServiceSection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing section if any
        await HomeServiceSection.deleteMany({});
        console.log('Cleared existing home service section content');

        const sectionData = {
            sideImage: '/images/ihome6.png',
            isActive: true
        };

        await HomeServiceSection.create(sectionData);
        console.log('Home service section seeded successfully');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding home service section:', error);
        process.exit(1);
    }
};

seedHomeServiceSection();
