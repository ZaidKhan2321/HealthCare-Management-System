import express from 'express';
import PrescriptionController from './Prescription.Controller.js';
import { jwtAuth, docAuth, patAuth } from '../../Middlewares/jwt.auth.js';

const router = express.Router();
const controller = new PrescriptionController();

// Doctor routes
router.post('/', jwtAuth, docAuth, (req, res) => controller.createPrescription(req, res));
router.put('/:prescriptionId', jwtAuth, docAuth, (req, res) => controller.updatePrescription(req, res));
router.get('/doctor', jwtAuth, docAuth, (req, res) => controller.getDoctorPrescriptions(req, res));

// Patient routes
router.get('/patient', jwtAuth, patAuth, (req, res) => controller.getPatientPrescriptions(req, res));

// Both doctor and patient can view a specific prescription if authorized
router.get('/:prescriptionId', jwtAuth, (req, res) => controller.getPrescriptionById(req, res));

export default router;
