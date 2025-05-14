import mongoose from 'mongoose';

export const auditLogSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true,
        enum: ['USER_CREATED', 'USER_MODIFIED', 'ROLE_CHANGED', 'USER_DEACTIVATED', 'PROFILE_UPDATED']
    },
    targetUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    details: {
        type: mongoose.Schema.Types.Mixed
    }
}, { timestamps: true });
