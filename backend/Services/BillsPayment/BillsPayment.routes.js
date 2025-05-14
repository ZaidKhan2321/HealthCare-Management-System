import express from 'express';
import BillsPaymentController from './BillsPayment.Controller.js';
import { jwtAuth, adminAuth, patAuth, docAuth } from '../../Middlewares/jwt.auth.js';

const router = express.Router();
const controller = new BillsPaymentController();

// Invoice generation (doctor or admin)
router.post('/generate', jwtAuth, docAuth, (req, res) => controller.generateInvoice(req, res));

// Patient: View their invoices
router.get('/patient', jwtAuth, patAuth, (req, res) => controller.getPatientInvoices(req, res));

// Doctor: View their invoices
router.get('/doctor', jwtAuth, docAuth, (req, res) => controller.getDoctorInvoices(req, res));

// Admin: View all invoices
router.get('/all', jwtAuth, adminAuth, (req, res) => controller.getAllInvoices(req, res));

// Get invoice by ID (doctor, patient, or admin)
router.get('/:billId', jwtAuth, (req, res) => controller.getInvoice(req, res));

// Payment processing (patient)
router.post('/pay', jwtAuth, patAuth, (req, res) => controller.processPayment(req, res));

// Insurance claim submission (patient)
router.post('/insurance-claim', jwtAuth, patAuth, (req, res) => controller.submitInsuranceClaim(req, res));

export default router;
