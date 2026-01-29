const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiry.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

/**
 * Public Route
 */
router.post('/submit', enquiryController.createEnquiry);

/**
 * Protected Admin Routes
 */
router.use(protect);
router.use(authorize('admin'));

router.get('/', enquiryController.getAllEnquiries);
router.get('/:id', enquiryController.getEnquiryById);
router.put('/:id/status', enquiryController.updateStatus);
router.put('/:id/notes', enquiryController.updateNotes);
router.delete('/:id', enquiryController.deleteEnquiry);

module.exports = router;
