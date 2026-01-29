const mongoose = require('mongoose');
const { mongodbUri } = require('./env');

/**
 * Connect to MongoDB database
 * Non-blocking connection - server will start even if MongoDB fails
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongodbUri, {
            // useNewUrlParser and useUnifiedTopology are no longer needed in Mongoose 6+
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error(`❌ MongoDB connection error: ${err}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️  MongoDB disconnected');
        });

        // Graceful shutdown
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed through app termination');
            process.exit(0);
        });

    } catch (error) {
        console.error(`❌ Error connecting to MongoDB: ${error.message}`);
        console.log(`⚠️  Server will continue running without database connection`);
        console.log(`ℹ️  Admin login API will work (uses hardcoded credentials)`);
        console.log(`ℹ️  User registration/login will NOT work until MongoDB is connected`);
        // Don't exit - continue running the server
    }
};

module.exports = connectDB;
