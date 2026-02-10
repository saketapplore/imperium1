const multer = require('multer');
const multerS3 = require('multer-s3');
const s3Client = require('../config/s3'); // Ensure this file exists and exports S3Client instance

const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            // Create a unique file name
            const timestamp = Date.now();
            const originalName = file.originalname.replace(/\s+/g, '-').toLowerCase();
            const key = `uploads/${timestamp}-${originalName}`;
            cb(null, key);
        },
        contentType: multerS3.AUTO_CONTENT_TYPE // Automatically detect content type
    }),
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

module.exports = upload;
