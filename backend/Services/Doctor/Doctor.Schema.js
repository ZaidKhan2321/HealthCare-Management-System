import mongoose from 'mongoose';

const qualificationSchema = new mongoose.Schema({
    degree: String,
    university: String,
    year: Number
}, { _id: false });

const scheduleSchema = new mongoose.Schema({
    dayOfWeek: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    startTime: String,
    endTime: String,
    isAvailable: Boolean
}, { _id: false });

export const doctorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    specialty: {
        type: String,
        required: true
    },
    qualifications: [qualificationSchema],
    contact: {
        phone: String,
        emergencyContact: String,
        hospitalAffiliation: String
    },
    schedule: [scheduleSchema],
    consultationFee: Number
}, { timestamps: true });
