import mongoose from 'mongoose';

export const analyticsLogSchema = new mongoose.Schema({
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reportType: { type: String, required: true },
    parameters: { type: Object },
    generatedAt: { type: Date, default: Date.now }
}, { timestamps: true });
