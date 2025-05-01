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
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        gender: { type: String, required: true },
        dateOfBirth: { type: Date, required: true },
        contactNumber: { type: String, required: true },
        address: { type: String, required: true }
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
