import mongoose from 'mongoose';
import { serviceSchema } from './MedicalService.Schema.js';

const ServiceModel = mongoose.model('MedicalService', serviceSchema);

export default class MedicalServiceRepository {
    async createService(serviceData) {
        const service = new ServiceModel(serviceData);
        return await service.save();
    }

    async getServiceById(serviceId) {
        return await ServiceModel.findById(serviceId);
    }

    async getAllServices() {
        return await ServiceModel.find({}).sort({ createdAt: -1 });
    }

    async updateService(serviceId, updateData) {
        return await ServiceModel.findByIdAndUpdate(
            serviceId,
            { $set: updateData },
            { new: true, runValidators: true }
        );
    }

    async updatePricing(serviceId, newPricing) {
        return await ServiceModel.findByIdAndUpdate(
            serviceId,
            { $set: { pricing: newPricing } },
            { new: true, runValidators: true }
        );
    }

    async deleteService(serviceId) {
        return await ServiceModel.findByIdAndDelete(serviceId);
    }
}
