/**
 * Script to create the initial admin user
 * Run this script with: node scripts/createAdmin.js
 */

const mongoose = require('mongoose');
const User = require('../src/models/user.model');
require('dotenv').config();

const ADMIN_DATA = {
    name: 'Admin',
    email: 'saket.kakkar@applore.in',
    password: 'saket123',
    role: 'admin',
    isActive: true,
};

const createAdmin = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/imperium');
        console.log('✅ Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: ADMIN_DATA.email });

        if (existingAdmin) {
            console.log('⚠️  Admin user already exists!');
            console.log(`Email: ${existingAdmin.email}`);
            console.log(`Role: ${existingAdmin.role}`);
            console.log(`Created: ${existingAdmin.createdAt}`);
            process.exit(0);
        }

        // Create admin user
        const admin = await User.create(ADMIN_DATA);

        console.log('\n🎉 Admin user created successfully!\n');
        console.log('====================================');
        console.log(`Name: ${admin.name}`);
        console.log(`Email: ${admin.email}`);
        console.log(`Password: ${ADMIN_DATA.password}`);
        console.log(`Role: ${admin.role}`);
        console.log(`Created: ${admin.createdAt}`);
        console.log('====================================\n');
        console.log('⚠️  Please change the password after first login!\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin user:', error.message);
        process.exit(1);
    }
};

createAdmin();
