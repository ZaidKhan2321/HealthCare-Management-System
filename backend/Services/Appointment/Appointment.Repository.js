import mongoose from 'mongoose';
import { appointmentSchema } from './Appointment.Schema.js';

const AppointmentModel = mongoose.model('Appointment', appointmentSchema);

export default class AppointmentRepository {
    async createAppointment(appointmentData) {
        const appointment = new AppointmentModel(appointmentData);
        return await appointment.save();
    }

    async getAppointmentById(appointmentId) {
        return await AppointmentModel.findById(appointmentId);
    }

    async getPatientAppointments(patientId) {
        return await AppointmentModel.find({ patientId })
            .sort({ date: 1, startTime: 1 });
    }

    async getDoctorAppointments(doctorId) {
        return await AppointmentModel.find({ doctorId })
            .sort({ date: 1, startTime: 1 });
    }

    async getAllAppointments() {
        return await AppointmentModel.find({})
            .sort({ date: 1, startTime: 1 });
    }

    async updateAppointment(appointmentId, updateData) {
        return await AppointmentModel.findByIdAndUpdate(
            appointmentId,
            { $set: updateData },
            { new: true }
        );
    }

    async deleteAppointment(appointmentId) {
        return await AppointmentModel.findByIdAndDelete(appointmentId);
    }

    async getUpcomingAppointments(hours = 24) {
        const now = new Date();
        const future = new Date(now.getTime() + hours * 60 * 60 * 1000);
        
        return await AppointmentModel.find({
            date: { $gte: now, $lte: future },
            status: 'approved',
            notificationSent: false
        }).populate('patientId doctorId', 'name email');
    }

    async markNotificationSent(appointmentId) {
        return await AppointmentModel.findByIdAndUpdate(
            appointmentId,
            { $set: { notificationSent: true } },
            { new: true }
        );
    }
}
