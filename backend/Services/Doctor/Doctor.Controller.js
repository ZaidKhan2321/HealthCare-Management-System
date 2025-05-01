import DoctorRepository from './Doctor.Repository.js';

export default class DoctorController {
    constructor() {
        this.doctorRepo = new DoctorRepository();
    }

    async createProfile(req, res) {
        try {
            const userId = req.user._id;
            const data = { ...req.body, userId };
            const existing = await this.doctorRepo.getDoctorByUserId(userId);
            if (existing) return res.status(400).json({ message: 'Profile already exists' });
            
            const doctor = await this.doctorRepo.createDoctorProfile(data);
            res.status(201).json(doctor);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getProfile(req, res) {
        try {
            const userId = req.user._id;
            const doctor = await this.doctorRepo.getDoctorByUserId(userId);
            if (!doctor) return res.status(404).json({ message: 'Profile not found' });
            res.status(200).json(doctor);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async updateProfile(req, res) {
        try {
            const userId = req.user._id;
            const updated = await this.doctorRepo.updateDoctorProfile(userId, req.body);
            if (!updated) return res.status(404).json({ message: 'Profile not found' });
            res.status(200).json(updated);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async updateSchedule(req, res) {
        try {
            const userId = req.user._id;
            const updated = await this.doctorRepo.updateSchedule(userId, req.body);
            if (!updated) return res.status(404).json({ message: 'Profile not found' });
            res.status(200).json(updated.schedule);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async deleteProfile(req, res) {
        try {
            const userId = req.user._id;
            const deleted = await this.doctorRepo.deleteDoctorProfile(userId);
            if (!deleted) return res.status(404).json({ message: 'Profile not found' });
            res.status(200).json({ message: 'Profile deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}
