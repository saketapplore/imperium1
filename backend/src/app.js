const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { clientUrl, nodeEnv } = require('./config/env');
const { notFound, errorHandler } = require('./middleware/error.middleware');

// Import routes
const adminRoutes = require('./routes/admin.routes');
const contentRoutes = require('./routes/content.routes');
const publicRoutes = require('./routes/public.routes');

// Initialize express app
const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
    cors({
        origin: clientUrl,
        credentials: true,
    })
);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware (only in development)
if (nodeEnv === 'development') {
    app.use(morgan('dev'));
}

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
    });
});

// API routes
app.use('/api/admin', adminRoutes); // Admin authentication
app.use('/api/admin/content', contentRoutes); // Admin content management (protected)
app.use('/api/content', publicRoutes); // Public content (no auth)

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

module.exports = app;
