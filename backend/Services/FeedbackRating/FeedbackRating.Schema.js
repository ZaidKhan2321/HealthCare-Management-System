import mongoose from 'mongoose';

export const feedbackRatingSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalService' }, // Optional
    rating: { type: Number, min: 1, max: 5, required: true },
    feedback: { type: String, maxlength: 1000 },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });
