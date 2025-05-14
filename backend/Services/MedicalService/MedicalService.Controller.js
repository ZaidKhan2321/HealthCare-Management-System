import MedicalServiceRepository from './MedicalService.Repository.js';

export default class MedicalServiceController {
    constructor() {
        this.serviceRepo = new MedicalServiceRepository();
    }

    async createService(req, res) {
        try {
            const service = await this.serviceRepo.createService(req.body);
            res.status(201).json(service);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getServices(req, res) {
        try {
            const services = await this.serviceRepo.getAllServices();
            res.status(200).json(services);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async updateService(req, res) {
        try {
            const updated = await this.serviceRepo.updateService(
                req.params.serviceId,
                req.body
            );
            if (!updated) return res.status(404).json({ message: 'Service not found' });
            res.status(200).json(updated);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async updateServicePricing(req, res) {
        try {
            const updated = await this.serviceRepo.updatePricing(
                req.params.serviceId,
                req.body
            );
            if (!updated) return res.status(404).json({ message: 'Service not found' });
            res.status(200).json(updated.pricing);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async deleteService(req, res) {
        try {
            const deleted = await this.serviceRepo.deleteService(req.params.serviceId);
            if (!deleted) return res.status(404).json({ message: 'Service not found' });
            res.status(200).json({ message: 'Service deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}
