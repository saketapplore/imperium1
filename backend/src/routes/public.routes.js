const express = require('express');
const router = express.Router();
const contentController = require('../controllers/content.controller');

// Public routes - no authentication required

// Get home page content
router.get('/home', contentController.getHomeContent);

// Get about page content
router.get('/about', contentController.getAboutContent);

// Get services
router.get('/services', contentController.getServicesContent);
router.get('/services/:id', contentController.getServiceById);

// Get all content at once (useful for initial load)
router.get('/all', contentController.getAllContent);

module.exports = router;
