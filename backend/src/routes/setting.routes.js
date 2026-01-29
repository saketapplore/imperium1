const express = require('express');
const router = express.Router();
const settingController = require('../controllers/setting.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// All settings routes are protected and admin only
router.use(protect);
router.use(authorize('admin'));

router.get('/', settingController.getSettings);
router.put('/notifications', settingController.updateNotificationEmails);
router.put('/contact', settingController.updateContactDetails);

module.exports = router;
