const mongoose = require('mongoose');

const focusedCategorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide category title'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please provide description'],
            trim: true,
        },
        image: {
            type: String,
            required: [true, 'Please provide image URL'],
        },
        displayOrder: {
            type: Number,
            default: 0,
            min: [0, 'Display order cannot be negative'],
        },
        isVisible: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const FocusedCategory = mongoose.model('FocusedCategory', focusedCategorySchema);

module.exports = FocusedCategory;
