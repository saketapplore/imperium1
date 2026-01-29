const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Enquiry = require('./src/models/enquiry.model');

dotenv.config();

const enquiries = [
    {
        name: 'John Doe',
        company: 'Tech Corp',
        email: 'john@techcorp.com',
        country: 'USA',
        serviceSelected: 'Web Development',
        projectRequirements: 'Build a new corporate website with React.',
        message: 'Looking for a reliable partner for our next big project.',
        status: 'New',
        internalNotes: ''
    },
    {
        name: 'Jane Smith',
        company: 'Design Studio',
        email: 'jane@designstudio.io',
        country: 'UK',
        serviceSelected: 'UI/UX Design',
        projectRequirements: 'Redesign our mobile app for better user experience.',
        message: 'We need a fresh look for our iOS and Android apps.',
        status: 'In Review',
        internalNotes: 'Sent an initial email to schedule a call.'
    },
    {
        name: 'Ahmed Khan',
        company: 'Global Trade',
        email: 'ahmed@globaltrade.ae',
        country: 'UAE',
        serviceSelected: 'Cloud Solutions',
        projectRequirements: 'Migrate our local servers to AWS.',
        message: 'Interested in optimizing our cloud infrastructure.',
        status: 'Closed',
        internalNotes: 'Project completed successfully.'
    }
];

const seedEnquiries = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding Enquiries...');

        await Enquiry.deleteMany();
        console.log('Cleared existing enquiries.');

        await Enquiry.insertMany(enquiries);
        console.log('Seed Enquiries added successfully!');

        process.exit();
    } catch (error) {
        console.error('Error seeding enquiries:', error);
        process.exit(1);
    }
};

seedEnquiries();
