import mongoose from 'mongoose';
import { analyticsLogSchema } from './Analytics.Schema.js';

// Import models from other services
import {userSchema} from '../User/User.Schema.js';
import {appointmentSchema} from '../Appointment/Appointment.Schema.js';
import {billSchema} from '../BillsPayment/BillsPayment.Schema.js';

const AnalyticsLogModel = mongoose.model('AnalyticsLog', analyticsLogSchema);
const AppointmentModel = mongoose.model('Appointment', appointmentSchema);
const BillModel = mongoose.model('Bill', billSchema);
const UserModel = mongoose.model('User', userSchema) ;



export default class AnalyticsRepository {
    // User statistics
    async getUserStats() {
        const totalUsers = await UserModel.countDocuments();
        const roles = await UserModel.aggregate([
            { $group: { _id: '$role', count: { $sum: 1 } } }
        ]);
        return { totalUsers, roles };
    }

    // Appointment statistics
    async getAppointmentStats(startDate, endDate) {
        const match = {};
        if (startDate && endDate) {
            match.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        const totalAppointments = await AppointmentModel.countDocuments(match);
        const byStatus = await AppointmentModel.aggregate([
            { $match: match },
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);
        return { totalAppointments, byStatus };
    }

    // Revenue statistics
    async getRevenueStats(startDate, endDate) {
        const match = {};
        if (startDate && endDate) {
            match.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        const totalRevenue = await BillModel.aggregate([
            { $match: { ...match, paymentStatus: 'paid' } },
            { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]);
        return {
            totalRevenue: totalRevenue[0] ? totalRevenue[0].total : 0
        };
    }

    // Log report generation
    async logReport(adminId, reportType, parameters) {
        const log = new AnalyticsLogModel({ adminId, reportType, parameters });
        return await log.save();
    }

    // Get recent analytics logs
    async getRecentLogs(limit = 10) {
        return await AnalyticsLogModel.find({}).sort({ createdAt: -1 }).limit(limit);
    }
}
