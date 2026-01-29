const Service = require('../models/service.model');
const { sendSuccess, sendError } = require('../utils/response');

// Get all services
const getAllServices = async (req, res, next) => {
    try {
        const services = await Service.find().sort({ displayOrder: 1 });

        sendSuccess(res, 200, 'Services retrieved successfully', {
            count: services.length,
            services,
        });
    } catch (error) {
        next(error);
    }
};

// Get single service
const getServiceById = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return sendError(res, 404, 'Service not found');
        }

        sendSuccess(res, 200, 'Service retrieved successfully', { service });
    } catch (error) {
        next(error);
    }
};

// Create new service
const createService = async (req, res, next) => {
    try {
        const service = await Service.create(req.body);

        sendSuccess(res, 201, 'Service created successfully', { service });
    } catch (error) {
        next(error);
    }
};

// Update service
const updateService = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!service) {
            return sendError(res, 404, 'Service not found');
        }

        sendSuccess(res, 200, 'Service updated successfully', { service });
    } catch (error) {
        next(error);
    }
};

// Delete service
const deleteService = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);

        if (!service) {
            return sendError(res, 404, 'Service not found');
        }

        sendSuccess(res, 200, 'Service deleted successfully');
    } catch (error) {
        next(error);
    }
};

// Toggle visibility
const toggleVisibility = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return sendError(res, 404, 'Service not found');
        }

        service.isVisible = !service.isVisible;
        await service.save();

        sendSuccess(res, 200, 'Visibility toggled successfully', { service });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
    toggleVisibility,
};
