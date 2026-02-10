require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const Service = require('../src/models/service.model');

// Initialize S3
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

// Services Data
const servicesData = [
    {
        title: "Private label Development",
        shortSummary: "We offer end-to-end private label services, supporting you from initial idea to final product. Our team helps with concept development, design, and reliable sourcing, making it possible to turn your vision into a market-ready product.",
        detailedDescription: "We offer end-to-end private label services, supporting you from initial idea to final product. Our team helps with concept development, design, and reliable sourcing, making it possible to turn your vision into a market-ready product.",
        imageName: "service1.png",
        displayOrder: 1
    },
    {
        title: "International Market Entry",
        shortSummary: "We advise brands on how and where to expand internationally through structured market entry strategies. Our focus is on market selection, entry readiness, and defining the most effective route to market.",
        detailedDescription: "We support both emerging brands preparing for their first international expansion and established brands entering new regions. We advise brands on how and where to expand internationally through structured market entry strategies. Our focus is on market selection, entry readiness, and defining the most effective route to market.",
        imageName: "service2.png",
        displayOrder: 2
    },
    {
        title: "Global Import/Export Solutions",
        shortSummary: "We advise brands on how and where to expand internationally through structured market entry strategies. Our focus is on market selection, entry readiness, and defining the most effective route to market.",
        detailedDescription: "We support both emerging brands preparing for their first international expansion and established brands entering new regions. We advise brands on how and where to expand internationally through structured market entry strategies. Our focus is on market selection, entry readiness, and defining the most effective route to market.",
        imageName: "service3.png",
        displayOrder: 3
    },
    {
        title: "Distribution channel building",
        shortSummary: "We advise brands on how and where to expand internationally through structured market entry strategies. Our focus is on market selection, entry readiness, and defining the most effective route to market.",
        detailedDescription: "We support both emerging brands preparing for their first international expansion and established brands entering new regions. We advise brands on how and where to expand internationally through structured market entry strategies. Our focus is on market selection, entry readiness, and defining the most effective route to market.",
        imageName: "service4.png",
        displayOrder: 4
    },
    {
        title: "Category Management",
        shortSummary: "We advise brands on how and where to expand internationally through structured market entry strategies. Our focus is on market selection, entry readiness, and defining the most effective route to market.",
        detailedDescription: "We support both emerging brands preparing for their first international expansion and established brands entering new regions. We advise brands on how and where to expand internationally through structured market entry strategies. Our focus is on market selection, entry readiness, and defining the most effective route to market.",
        imageName: "service5.png",
        displayOrder: 5
    }
];

// Helper to upload file
const uploadFile = async (filePath, fileName) => {
    try {
        const fileStream = fs.createReadStream(filePath);
        const upload = new Upload({
            client: s3Client,
            params: {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: `services/${Date.now()}-${fileName}`,
                Body: fileStream,
                ContentType: 'image/png' // Assuming png based on filenames
            }
        });

        const result = await upload.done();
        return result.Location;
    } catch (error) {
        console.error(`Error uploading ${fileName}:`, error);
        return null;
    }
};

const seedServices = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing services
        await Service.deleteMany({});
        console.log('Cleared existing services');

        for (const service of servicesData) {
            const imagePath = path.join(__dirname, '../../website-frontend/public/images', service.imageName);

            if (fs.existsSync(imagePath)) {
                console.log(`Uploading image for ${service.title}...`);
                const imageUrl = await uploadFile(imagePath, service.imageName);

                if (imageUrl) {
                    await Service.create({
                        ...service,
                        image: imageUrl
                    });
                    console.log(`Created service: ${service.title}`);
                } else {
                    console.error(`Failed to upload image for ${service.title}, skipping...`);
                }
            } else {
                console.warn(`Image not found: ${imagePath}, creating service without image`);
                await Service.create({
                    ...service,
                    image: '' // Fallback or keep empty
                });
            }
        }

        console.log('Seeding completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding services:', error);
        process.exit(1);
    }
};

seedServices();
