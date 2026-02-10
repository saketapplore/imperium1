const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { sendSuccess, sendError } = require('../utils/response');

const { protect } = require('../middleware/auth.middleware');

// Protect all routes
router.use(protect);

// Route: POST /api/upload
// Access: Private (Admin)
// Description: Upload image to S3
router.post('/', (req, res, next) => {
    // Single file upload. The field name in form-data should be 'image' or 'file'.
    // Using 'file' as generic name.
    const uploadSingle = upload.single('file');

    uploadSingle(req, res, function (err) {
        if (err) {
            return sendError(res, 400, err.message);
        }

        if (!req.file) {
            return sendError(res, 400, 'No file uploaded');
        }

        // Multer-S3 adds 'location' property to req.file with the S3 URL
        const fileUrl = req.file.location;

        sendSuccess(res, 200, 'File uploaded successfully', { url: fileUrl });
    });
});

module.exports = router;
