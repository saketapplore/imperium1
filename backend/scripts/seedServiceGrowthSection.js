require('dotenv').config();
const mongoose = require('mongoose');
const ServiceGrowthSection = require('../src/models/serviceGrowthSection.model');

const seedServiceGrowthSection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing section if any
        await ServiceGrowthSection.deleteMany({});
        console.log('Cleared existing service growth section content');

        const sectionData = {
            image: '/images/service21.png',
            isActive: true
        };

        await ServiceGrowthSection.create(sectionData);
        console.log('Service growth section seeded successfully');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding service growth section:', error);
        process.exit(1);
    }
};

seedServiceGrowthSection();
