import PatientRepository from './Patient.Repository.js';

export default class PatientController {
    constructor() {
        this.patientRepo = new PatientRepository();
    }

    // Create patient profile
    async createProfile(req, res) {
        try {
            const userId = req.user._id;
            const data = { ...req.body, userId };
            const existing = await this.patientRepo.getPatientByUserId(userId);
            if (existing) {
                return res.status(400).json({ message: 'Profile already exists' });
            }
            const patient = await this.patientRepo.createPatientProfile(data);
            return res.status(201).json(patient);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    // Get patient profile
    async getProfile(req, res) {
        try {
            const userId = req.user._id;
            const patient = await this.patientRepo.getPatientByUserId(userId);
            if (!patient) return res.status(404).json({ message: 'Profile not found' });
            return res.status(200).json(patient);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    // Update patient profile
    async updateProfile(req, res) {
        try {
            const userId = req.user._id;
            const updated = await this.patientRepo.updatePatientProfile(userId, req.body);
            if (!updated) return res.status(404).json({ message: 'Profile not found' });
            return res.status(200).json(updated);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    // Delete patient profile
    async deleteProfile(req, res) {
        try {
            const userId = req.user._id;
            const deleted = await this.patientRepo.deletePatientProfile(userId);
            if (!deleted) return res.status(404).json({ message: 'Profile not found' });
            return res.status(200).json({ message: 'Profile deleted' });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    // Medical History
    async updateMedicalHistory(req, res) {
        try {
            const userId = req.user._id;
            const updated = await this.patientRepo.updateMedicalHistory(userId, req.body);
            if (!updated) return res.status(404).json({ message: 'Profile not found' });
            return res.status(200).json(updated.medicalHistory);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    // EHR
    async updateEHR(req, res) {
        try {
            const userId = req.user._id;
            const updated = await this.patientRepo.updateEHR(userId, req.body);
            if (!updated) return res.status(404).json({ message: 'Profile not found' });
            return res.status(200).json(updated.ehr);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}
