import mongoose from 'mongoose';
import { patientSchema } from './Patient.Schema.js';

const PatientModel = mongoose.model('Patient', patientSchema);

export default class PatientRepository {
    async createPatientProfile(data) {
        const patient = new PatientModel(data);
        return await patient.save();
    }

    async getPatientByUserId(userId) {
        return await PatientModel.findOne({ userId });
    }

    async updatePatientProfile(userId, updateData) {
        return await PatientModel.findOneAndUpdate(
            { userId },
            { $set: updateData },
            { new: true }
        );
    }

    async deletePatientProfile(userId) {
        return await PatientModel.findOneAndDelete({ userId });
    }

    // Medical History
    async updateMedicalHistory(userId, historyData) {
        return await PatientModel.findOneAndUpdate(
            { userId },
            { $set: { medicalHistory: historyData } },
            { new: true }
        );
    }

    // EHR
    async updateEHR(userId, ehrData) {
        return await PatientModel.findOneAndUpdate(
            { userId },
            { $set: { ehr: ehrData } },
            { new: true }
        );
    }
}
