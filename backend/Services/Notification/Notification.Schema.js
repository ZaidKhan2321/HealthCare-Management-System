import mongoose from 'mongoose';

export const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { 
        type: String, 
        enum: ['appointment', 'test-result', 'message', 'system'], 
        required: true 
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    data: { type: Object }, // Additional data (appointmentId, etc.)
    read: { type: Boolean, default: false },
    sentAt: { type: Date, default: Date.now }
}, { timestamps: true });
