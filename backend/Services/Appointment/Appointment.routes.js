import express from 'express';
import AppointmentController from './Appointment.Controller.js';
import { jwtAuth, adminAuth, docAuth, patAuth } from '../../Middlewares/jwt.auth.js';

const router = express.Router();
const controller = new AppointmentController();

// Patient routes
router.post('/book', jwtAuth, patAuth, (req, res) => controller.bookAppointment(req, res));
router.get('/patient', jwtAuth, patAuth, (req, res) => controller.getPatientAppointments(req, res));
router.put('/reschedule/:appointmentId', jwtAuth, patAuth, (req, res) => controller.rescheduleAppointment(req, res));
router.put('/cancel/:appointmentId', jwtAuth, patAuth, (req, res) => controller.cancelAppointment(req, res));

// Doctor routes
router.get('/doctor', jwtAuth, docAuth, (req, res) => controller.getDoctorAppointments(req, res));
router.put('/status/:appointmentId', jwtAuth, docAuth, (req, res) => controller.updateAppointmentStatus(req, res));

// Admin routes
router.get('/all', jwtAuth, adminAuth, (req, res) => controller.getAllAppointments(req, res));
router.put('/admin/status/:appointmentId', jwtAuth, adminAuth, (req, res) => controller.updateAppointmentStatus(req, res));

// Notification route
router.post('/send-reminders', jwtAuth, adminAuth, (req, res) => controller.sendAppointmentReminders(req, res));

export default router;
