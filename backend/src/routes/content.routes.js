const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');

// Import controllers
const homeHeroController = require('../controllers/homeHero.controller');
const coreOfferingController = require('../controllers/coreOffering.controller');
const aboutUsController = require('../controllers/aboutUs.controller');
const leadershipController = require('../controllers/leadership.controller');
const serviceController = require('../controllers/service.controller');
const focusedCategoryController = require('../controllers/focusedCategory.controller');
const serviceGrowthSectionController = require('../controllers/serviceGrowthSection.controller');
const serviceHeroController = require('../controllers/serviceHero.controller');
const aboutImagesController = require('../controllers/aboutImages.controller');
const contactContentController = require('../controllers/contactContent.controller');

// All routes are protected (admin only)
router.use(protect);
router.use(authorize('admin'));

// ==================== CONTACT CONTENT ====================
router.get('/contact', contactContentController.getContactContent);
router.put('/contact', contactContentController.updateContactContent);

// ==================== ABOUT IMAGES ====================
router.get('/about-images', aboutImagesController.getAboutImages);
router.put('/about-images', aboutImagesController.updateAboutImages);

// ==================== SERVICE HERO ====================
router.get('/service-hero', serviceHeroController.getServiceHero);
router.put('/service-hero', serviceHeroController.updateServiceHero);

// ==================== HOME HERO ====================
router.get('/home-hero', homeHeroController.getHomeHero);
router.put('/home-hero', homeHeroController.updateHomeHero);

// ==================== SERVICE GROWTH SECTION ====================
router.get('/service-growth-section', serviceGrowthSectionController.getServiceGrowthSection);
router.put('/service-growth-section', serviceGrowthSectionController.updateServiceGrowthSection);

// ==================== HOME IMAGE SECTION ====================
const homeImageSectionController = require('../controllers/homeImageSection.controller');
router.get('/home-image-section', homeImageSectionController.getHomeImageSection);
router.put('/home-image-section', homeImageSectionController.updateHomeImageSection);

// ==================== HOME SERVICE SECTION ====================
const homeServiceSectionController = require('../controllers/homeServiceSection.controller');
router.get('/home-service-section', homeServiceSectionController.getHomeServiceSection);
router.put('/home-service-section', homeServiceSectionController.updateHomeServiceSection);

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

// ==================== FOCUSED CATEGORIES ====================
router.get('/focused-categories', focusedCategoryController.getAllCategories);
router.get('/focused-categories/:id', focusedCategoryController.getCategoryById);
router.post('/focused-categories', focusedCategoryController.createCategory);
router.put('/focused-categories/:id', focusedCategoryController.updateCategory);
router.delete('/focused-categories/:id', focusedCategoryController.deleteCategory);
router.patch('/focused-categories/:id/toggle-visibility', focusedCategoryController.toggleVisibility);

module.exports = router;
