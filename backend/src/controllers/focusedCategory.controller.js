const FocusedCategory = require('../models/focusedCategory.model');
const { sendSuccess, sendError } = require('../utils/response');

// Get all focused categories
const getAllCategories = async (req, res, next) => {
    try {
        const categories = await FocusedCategory.find().sort({ displayOrder: 1 });

        sendSuccess(res, 200, 'Focused categories retrieved successfully', {
            count: categories.length,
            categories,
        });
    } catch (error) {
        next(error);
    }
};

// Get single focused category
const getCategoryById = async (req, res, next) => {
    try {
        const category = await FocusedCategory.findById(req.params.id);

        if (!category) {
            return sendError(res, 404, 'Category not found');
        }

        sendSuccess(res, 200, 'Focused category retrieved successfully', { category });
    } catch (error) {
        next(error);
    }
};

// Create new focused category
const createCategory = async (req, res, next) => {
    try {
        const category = await FocusedCategory.create(req.body);

        sendSuccess(res, 201, 'Focused category created successfully', { category });
    } catch (error) {
        next(error);
    }
};

// Update focused category
const updateCategory = async (req, res, next) => {
    try {
        const category = await FocusedCategory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!category) {
            return sendError(res, 404, 'Category not found');
        }

        sendSuccess(res, 200, 'Focused category updated successfully', { category });
    } catch (error) {
        next(error);
    }
};

// Delete focused category
const deleteCategory = async (req, res, next) => {
    try {
        const category = await FocusedCategory.findByIdAndDelete(req.params.id);

        if (!category) {
            return sendError(res, 404, 'Category not found');
        }

        sendSuccess(res, 200, 'Focused category deleted successfully');
    } catch (error) {
        next(error);
    }
};

// Toggle visibility
const toggleVisibility = async (req, res, next) => {
    try {
        const category = await FocusedCategory.findById(req.params.id);

        if (!category) {
            return sendError(res, 404, 'Category not found');
        }

        category.isVisible = !category.isVisible;
        await category.save();

        sendSuccess(res, 200, 'Visibility toggled successfully', { category });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    toggleVisibility,
};
