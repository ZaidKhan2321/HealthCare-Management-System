import mongoose from 'mongoose';
import { auditLogSchema } from './Admin.Schema.js';
import UserRepository from '../User/User.Repository.js';

const AuditLogModel = mongoose.model('AuditLog', auditLogSchema);
const userRepo = new UserRepository();

export default class AdminRepository {
    // User Management
    async findAllUsers() {
        return await userRepo.findAll();
    }

    async approveUser(userId) {
        return await UserModel.findByIdAndUpdate(
            userId,
            { $set: { isApproved: true } },
            { new: true }
        );
    }

    async deactivateUser(userId) {
        return await UserModel.findByIdAndUpdate(
            userId,
            { $set: { isActive: false } },
            { new: true }
        );
    }

    // Role Management
    async updateUserRole(userId, newRole) {
        return await userRepo.updateAnyUser(userId, null, null, null, newRole);
    }

    // Dashboard & Reporting
    async getSystemStats() {
        const usersByRole = await UserModel.aggregate([
            { $group: { _id: "$role", count: { $sum: 1 } } }
        ]);
        
        const recentActivities = await AuditLogModel.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('performedBy targetUserId', 'name role');

        return {
            usersByRole,
            recentActivities
        };
    }

    // Audit Logs
    async createAuditLog(logData) {
        const log = new AuditLogModel(logData);
        return await log.save();
    }
}
