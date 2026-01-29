const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');

// Import controllers
const homeHeroController = require('../controllers/homeHero.controller');
const coreOfferingController = require('../controllers/coreOffering.controller');
const aboutUsController = require('../controllers/aboutUs.controller');
const leadershipController = require('../controllers/leadership.controller');
const serviceController = require('../controllers/service.controller');

// All routes are protected (admin only)
router.use(protect);
router.use(authorize('admin'));

// ==================== HOME HERO ====================
router.get('/home-hero', homeHeroController.getHomeHero);
router.put('/home-hero', homeHeroController.updateHomeHero);

// ==================== CORE OFFERINGS ====================
router.get('/core-offerings', coreOfferingController.getAllOfferings);
router.get('/core-offerings/:id', coreOfferingController.getOfferingById);
router.post('/core-offerings', coreOfferingController.createOffering);
router.put('/core-offerings/:id', coreOfferingController.updateOffering);
router.delete('/core-offerings/:id', coreOfferingController.deleteOffering);
router.patch('/core-offerings/:id/toggle-visibility', coreOfferingController.toggleVisibility);

// ==================== ABOUT US ====================
router.get('/about-us', aboutUsController.getAboutUs);
router.put('/about-us', aboutUsController.updateAboutUs);

// ==================== LEADERSHIP ====================
router.get('/leadership', leadershipController.getAllLeadership);
router.get('/leadership/:id', leadershipController.getLeadershipById);
router.post('/leadership', leadershipController.createLeadership);
router.put('/leadership/:id', leadershipController.updateLeadership);
router.delete('/leadership/:id', leadershipController.deleteLeadership);
router.patch('/leadership/:id/toggle-visibility', leadershipController.toggleVisibility);

// ==================== SERVICES ====================
router.get('/services', serviceController.getAllServices);
router.get('/services/:id', serviceController.getServiceById);
router.post('/services', serviceController.createService);
router.put('/services/:id', serviceController.updateService);
router.delete('/services/:id', serviceController.deleteService);
router.patch('/services/:id/toggle-visibility', serviceController.toggleVisibility);

module.exports = router;
