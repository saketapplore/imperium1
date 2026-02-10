require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const Leadership = require('../src/models/leadership.model');

// AWS S3 Configuration
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// Leadership data with local image paths
const leadershipData = [
    {
        name: 'Janita Bajnath',
        designation: 'Lorem ipsum',
        bio: 'Janita brings extensive experience in International business development, brand partnerships, and market expansion across Europe and global markets. She leads commercial strategy, brand partnerships, and international growth initiatives, with a strong focus on structured distribution, brand integrity, and long-term value creation.',
        imageName: 'dummyProfile.png',
        displayOrder: 1,
        isVisible: true,
        socialLinks: {
            linkedin: '',
            twitter: '',
            email: ''
        }
    },
    {
        name: 'Sofie Wang-Vlasman',
        designation: 'Lorem ipsum',
        bio: 'Sofie specializes in international trade, sourcing, and supply chain management, with deep experience across Asia and European markets. She oversees supplier relationships, trade coordination, and operational alignment, ensuring compliant and efficient international execution.',
        imageName: 'dummyProfile.png',
        displayOrder: 2,
        isVisible: true,
        socialLinks: {
            linkedin: '',
            twitter: '',
            email: ''
        }
    },
    {
        name: 'Chris Kyriakides',
        designation: 'Lorem ipsum',
        bio: 'Chris brings senior-level expertise in strategic operations, licensing, and scalable energy projects. He focuses on complex international projects, risk assessment, and scalable trade frameworks, supporting disciplined growth across regulated and capital-intensive sectors.',
        imageName: 'dummyProfile.png',
        displayOrder: 3,
        isVisible: true,
        socialLinks: {
            linkedin: '',
            twitter: '',
            email: ''
        }
    }
];

// Upload file to S3
const uploadFile = async (filePath, fileName) => {
    try {
        const fileStream = fs.createReadStream(filePath);
        const ext = path.extname(fileName).toLowerCase();
        const contentTypeMap = {
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.webp': 'image/webp'
        };

        const upload = new Upload({
            client: s3Client,
            params: {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: `leadership/${Date.now()}-${fileName}`,
                Body: fileStream,
                ContentType: contentTypeMap[ext] || 'application/octet-stream'
            }
        });

        const result = await upload.done();
        return result.Location;
    } catch (error) {
        console.error(`Error uploading ${fileName}:`, error);
        return null;
    }
};

// Main seeding function
const seedLeadership = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing leadership data
        await Leadership.deleteMany({});
        console.log('🗑️  Cleared existing leadership data');

        // Process each leader
        for (const leader of leadershipData) {
            const imagePath = path.join(__dirname, '../website-frontend/public/images', leader.imageName);

            if (fs.existsSync(imagePath)) {
                console.log(`📤 Uploading image for ${leader.name}...`);
                const imageUrl = await uploadFile(imagePath, leader.imageName);

                if (imageUrl) {
                    await Leadership.create({
                        name: leader.name,
                        designation: leader.designation,
                        bio: leader.bio,
                        photo: imageUrl,
                        displayOrder: leader.displayOrder,
                        isVisible: leader.isVisible,
                        socialLinks: leader.socialLinks
                    });
                    console.log(`✅ Created leadership profile: ${leader.name}`);
                } else {
                    console.error(`❌ Failed to upload image for ${leader.name}, skipping...`);
                }
            } else {
                console.warn(`⚠️  Image not found: ${imagePath}, creating profile without image`);
                await Leadership.create({
                    name: leader.name,
                    designation: leader.designation,
                    bio: leader.bio,
                    photo: '',
                    displayOrder: leader.displayOrder,
                    isVisible: leader.isVisible,
                    socialLinks: leader.socialLinks
                });
            }
        }

        console.log('✅ Leadership seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding leadership:', error);
        process.exit(1);
    }
};

// Run the seeding
seedLeadership();
