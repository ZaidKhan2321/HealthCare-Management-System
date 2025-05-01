import mongoose from 'mongoose';

export const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'declined', 'cancelled', 'completed'],
        default: 'pending'
    },
    reason: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    notificationSent: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
