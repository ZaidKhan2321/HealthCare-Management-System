import PrescriptionRepository from './Prescription.Repository.js';
import PatientRepository from '../Patient/Patient.Repository.js';

export default class PrescriptionController {
    constructor() {
        this.prescriptionRepo = new PrescriptionRepository();
        this.patientRepo = new PatientRepository() ;
    }

    // Doctor: Create a prescription for a patient
    async createPrescription(req, res) {
        try {
            const doctorId = req.user._id;
            const { patientId, medications, notes } = req.body;
            const prescription = await this.prescriptionRepo.createPrescription({
                doctorId,
                patientId,
                medications,
                notes
            });
            return res.status(201).json(prescription);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    // Doctor: Update a prescription
    async updatePrescription(req, res) {
        try {
            const doctorId = req.user._id;
            const { prescriptionId } = req.params;
            const prescription = await this.prescriptionRepo.getPrescriptionById(prescriptionId);

            if (!prescription) {
                return res.status(404).json({ message: 'Prescription not found' });
            }
            if (prescription.doctorId._id.toString() !== doctorId.toString()) {
                return res.status(403).json({ message: 'Not authorized to update this prescription' });
            }

            const updated = await this.prescriptionRepo.updatePrescription(prescriptionId, req.body);
            return res.status(200).json(updated);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    // Doctor: View all prescriptions they have written
    async getDoctorPrescriptions(req, res) {
        try {
            const doctorId = req.user._id;
            const prescriptions = await this.prescriptionRepo.getPrescriptionsByDoctor(doctorId);
            return res.status(200).json(prescriptions);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    // Patient: View their own prescription history
    async getPatientPrescriptions(req, res) {
        try {
            const userId = req.user._id ;
            const {patientId} = this.patientRepo.getPatientByUserId(userId) ;
            const prescriptions = await this.prescriptionRepo.getPrescriptionsByPatient(patientId);
            return res.status(200).json(prescriptions);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    // Doctor or patient: View a single prescription (if authorized)
    async getPrescriptionById(req, res) {
        try {
            const userId = req.user._id;
            const userRole = req.user.role;
            const { prescriptionId } = req.params;

            const prescription = await this.prescriptionRepo.getPrescriptionById(prescriptionId);
            if (!prescription) {
                return res.status(404).json({ message: 'Prescription not found' });
            }
            if (
                (userRole === 1 && prescription.doctorId._id.toString() === userId.toString()) ||
                (userRole === 2 && prescription.patientId._id.toString() === userId.toString())
            ) {
                return res.status(200).json(prescription);
            }
            return res.status(403).json({ message: 'Not authorized to view this prescription' });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}
