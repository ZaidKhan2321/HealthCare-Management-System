import mongoose from 'mongoose';

const medicalHistorySchema = new mongoose.Schema({
    allergies: [String],
    chronicConditions: [String],
    pastIllnesses: [String],
    surgeries: [String],
    familyHistory: [String]
}, { _id: false });

const ehrSchema = new mongoose.Schema({
    diagnoses: [String],
    labResults: [{
        date: Date,
        type: String,
        result: String
    }],
    visitSummaries: [{
        date: Date,
        summary: String
    }],
    prescriptions: [{
        date: Date,
        medication: String,
        dosage: String,
        instructions: String
    }]
}, { _id: false });

export const patientSchema = new mongoose.Schema({
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
    demographics: {
        maritalStatus: String,
        occupation: String,
        ethnicity: String
    },
    insurance: {
        provider: String,
        policyNumber: String,
        validTill: Date
    },
    medicalHistory: medicalHistorySchema,
    ehr: ehrSchema
}, { timestamps: true });
