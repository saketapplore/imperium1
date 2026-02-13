require('dotenv').config();
const mongoose = require('mongoose');
const HomeImageSection = require('../src/models/homeImageSection.model');

const seedHomeImageSection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing section if any
        await HomeImageSection.deleteMany({});
        console.log('Cleared existing home image section content');

        const sectionData = {
            image: '/images/ihome4.png',
            isActive: true
        };

        await HomeImageSection.create(sectionData);
        console.log('Home image section seeded successfully');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding home image section:', error);
        process.exit(1);
    }
};

seedHomeImageSection();
