require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const FocusedCategory = require('../src/models/focusedCategory.model');

// Initialize S3
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

// Focused Categories Data
const categoriesData = [
    {
        title: "FMCG & Consumer Goods",
        description: "At Solved Imperium Ventures, we turn complexity into clarity and transform opportunities into commercial success. Whether expanding globally or entering a new market, we act as a trusted partner across every step of the supply chain. With a team of seasoned professionals in different continents, we streamline import/export operations, building strategic global distribution networks to crafting bespoke private label solutions.",
        imageName: "iservice7.png",
        displayOrder: 1
    },
    {
        title: "Healthcare & Pharmaceuticals",
        description: "Navigating the complex regulatory landscape of healthcare and pharmaceuticals requires precision and expertise. We provide end-to-end supply chain solutions, ensuring compliant and efficient distribution of life-saving products across international borders.",
        imageName: "iservice10.png", // Alternative if it exists, or use common
        displayOrder: 2
    },
    {
        title: "Electronics & Technology",
        description: "From component sourcing to finished goods distribution, we optimize the electronics supply chain for speed and reliability. Our global network helps tech brands reach new markets faster while maintaining product integrity and security.",
        imageName: "iservice4.png", // Reusing an existing one if needed
        displayOrder: 3
    },
    {
        title: "Industrial & Manufacturing",
        description: "Supporting heavy industry with robust logistics and sourcing strategies. We streamline the movement of industrial machinery and raw materials, ensuring your manufacturing processes never face a bottleneck.",
        imageName: "iservice6.png",
        displayOrder: 4
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
                Key: `focused-categories/${Date.now()}-${fileName}`,
                Body: fileStream,
                ContentType: 'image/png'
            }
        });

        const result = await upload.done();
        return result.Location;
    } catch (error) {
        console.error(`Error uploading ${fileName}:`, error);
        return null;
    }
};

const seedCategories = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing categories
        await FocusedCategory.deleteMany({});
        console.log('Cleared existing focused categories');

        for (const category of categoriesData) {
            const imagePath = path.join(__dirname, '../../website-frontend/public/images', category.imageName);

            if (fs.existsSync(imagePath)) {
                console.log(`Uploading image for ${category.title}...`);
                const imageUrl = await uploadFile(imagePath, category.imageName);

                if (imageUrl) {
                    await FocusedCategory.create({
                        title: category.title,
                        description: category.description,
                        image: imageUrl,
                        displayOrder: category.displayOrder
                    });
                    console.log(`Created category: ${category.title}`);
                } else {
                    console.error(`Failed to upload image for ${category.title}, skipping...`);
                }
            } else {
                console.warn(`Image not found: ${imagePath}, creating category with placeholder if possible`);
                // Use a default path or empty
                await FocusedCategory.create({
                    title: category.title,
                    description: category.description,
                    image: 'https://via.placeholder.com/800x600?text=' + encodeURIComponent(category.title),
                    displayOrder: category.displayOrder
                });
            }
        }

        console.log('Seeding completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding focused categories:', error);
        process.exit(1);
    }
};

seedCategories();
