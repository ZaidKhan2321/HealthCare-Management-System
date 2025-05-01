import AppointmentRepository from './Appointment.Repository.js';
import { sendAppointmentNotification } from '../../utils/notificationService.js';

export default class AppointmentController {
    constructor() {
        this.appointmentRepo = new AppointmentRepository();
    }

    // Book a new appointment
    async bookAppointment(req, res) {
        try {
            const patientId = req.user._id;
            const { doctorId, date, startTime, endTime, reason } = req.body;

            const appointmentData = {
                patientId,
                doctorId,
                date: new Date(date),
                startTime,
                endTime,
                reason,
                status: 'pending'
            };

            const appointment = await this.appointmentRepo.createAppointment(appointmentData);
            return res.status(201).json(appointment);
        } catch (err) {
            console.log(`err: ${err.message}`);
            return res.status(500).json({
                message: err.message
            });
        }
    }

    // Get appointments for the logged-in patient
    async getPatientAppointments(req, res) {
        try {
            const patientId = req.user._id;
            const appointments = await this.appointmentRepo.getPatientAppointments(patientId);
            return res.status(200).json(appointments);
        } catch (err) {
            console.log(`err: ${err.message}`);
            return res.status(500).json({
                message: err.message
            });
        }
    }

    // Get appointments for the logged-in doctor
    async getDoctorAppointments(req, res) {
        try {
            const doctorId = req.user._id;
            const appointments = await this.appointmentRepo.getDoctorAppointments(doctorId);
            return res.status(200).json(appointments);
        } catch (err) {
            console.log(`err: ${err.message}`);
            return res.status(500).json({
                message: err.message
            });
        }
    }

    // Get all appointments (admin only)
    async getAllAppointments(req, res) {
        try {
            const appointments = await this.appointmentRepo.getAllAppointments();
            return res.status(200).json(appointments);
        } catch (err) {
            console.log(`err: ${err.message}`);
            return res.status(500).json({
                message: err.message
            });
        }
    }

    // Update appointment status (doctor or admin)
    async updateAppointmentStatus(req, res) {
        try {
            const { appointmentId } = req.params;
            const { status, notes } = req.body;
            
            const appointment = await this.appointmentRepo.getAppointmentById(appointmentId);
            if (!appointment) {
                return res.status(404).json({ message: 'Appointment not found' });
            }

            // Only allow doctors to update their own appointments
            if (req.user.role === 1 && appointment.doctorId.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'Not authorized to update this appointment' });
            }

            const updatedAppointment = await this.appointmentRepo.updateAppointment(
                appointmentId,
                { status, notes }
            );

            // Send notification on status change
            await sendAppointmentNotification(updatedAppointment);

            return res.status(200).json(updatedAppointment);
        } catch (err) {
            console.log(`err: ${err.message}`);
            return res.status(500).json({
                message: err.message
            });
        }
    }

    // Reschedule appointment (patient only)
    async rescheduleAppointment(req, res) {
        try {
            const { appointmentId } = req.params;
            const { date, startTime, endTime } = req.body;
            
            const appointment = await this.appointmentRepo.getAppointmentById(appointmentId);
            if (!appointment) {
                return res.status(404).json({ message: 'Appointment not found' });
            }

            // Only allow patients to reschedule their own appointments
            if (appointment.patientId.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'Not authorized to reschedule this appointment' });
            }

            const updatedAppointment = await this.appointmentRepo.updateAppointment(
                appointmentId,
                { 
                    date: new Date(date), 
                    startTime, 
                    endTime, 
                    status: 'pending',
                    notificationSent: false
                }
            );

            return res.status(200).json(updatedAppointment);
        } catch (err) {
            console.log(`err: ${err.message}`);
            return res.status(500).json({
                message: err.message
            });
        }
    }

    // Cancel appointment (patient only)
    async cancelAppointment(req, res) {
        try {
            const { appointmentId } = req.params;
            
            const appointment = await this.appointmentRepo.getAppointmentById(appointmentId);
            if (!appointment) {
                return res.status(404).json({ message: 'Appointment not found' });
            }

            // Only allow patients to cancel their own appointments
            if (appointment.patientId.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'Not authorized to cancel this appointment' });
            }

            const updatedAppointment = await this.appointmentRepo.updateAppointment(
                appointmentId,
                { status: 'cancelled' }
            );

            return res.status(200).json(updatedAppointment);
        } catch (err) {
            console.log(`err: ${err.message}`);
            return res.status(500).json({
                message: err.message
            });
        }
    }

    // Send notifications for upcoming appointments
    async sendAppointmentReminders(req, res) {
        try {
            const upcomingAppointments = await this.appointmentRepo.getUpcomingAppointments(24);
            
            for (const appointment of upcomingAppointments) {
                await sendAppointmentNotification(appointment);
                await this.appointmentRepo.markNotificationSent(appointment._id);
            }

            return res.status(200).json({ 
                message: `Sent ${upcomingAppointments.length} appointment reminders` 
            });
        } catch (err) {
            console.log(`err: ${err.message}`);
            return res.status(500).json({
                message: err.message
            });
        }
    }
}
