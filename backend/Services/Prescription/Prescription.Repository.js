import mongoose from 'mongoose';
import { prescriptionSchema } from './Prescription.Schema.js';

const PrescriptionModel = mongoose.model('Prescription', prescriptionSchema);

export default class PrescriptionRepository {
    async createPrescription(data) {
        const prescription = new PrescriptionModel(data);
        return await prescription.save();
    }

    async getPrescriptionById(prescriptionId) {
        return await PrescriptionModel.findById(prescriptionId)
            .populate('doctorId', 'name email')
            .populate('patientId', 'name email');
    }

    async getPrescriptionsByPatient(patientId) {
        return await PrescriptionModel.find({ patientId })
            .sort({ date: -1 })
            .populate('doctorId', 'name email');
    }

    async getPrescriptionsByDoctor(doctorId) {
        return await PrescriptionModel.find({ doctorId })
            .sort({ date: -1 })
            .populate('patientId', 'name email');
    }

    async updatePrescription(prescriptionId, updateData) {
        return await PrescriptionModel.findByIdAndUpdate(
            prescriptionId,
            { $set: updateData },
            { new: true }
        );
    }
}
