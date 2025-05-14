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
    personalInfo: {
        firstName: { 
            type: String, 
            required: [true, 'First name is required'] 
        },
        lastName: { 
            type: String, 
            required: [true, 'Last name is required'] 
        },
        gender: { 
            type: String, 
            enum: ['male', 'female', 'other'],
            required: [true, 'Gender is required'] 
        },
        dateOfBirth: { 
            type: Date, 
            required: [true, 'Date of birth is required'] 
        },
        contactNumber: { 
            type: String, 
            required: [true, 'Contact number is required'],
            validate: {
            validator: (v) => /^\d{10}$/.test(v),
            message: 'Invalid phone number format'
            }
        },
        address: { 
            type: String, 
            required: [true, 'Address is required'] 
        }
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
