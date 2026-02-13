const mongoose = require('mongoose');

const contactContentSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            default: '/images/contact1.png'
        }
    },
    {
        timestamps: true,
    }
);

const ContactContent = mongoose.model('ContactContent', contactContentSchema);

module.exports = ContactContent;
