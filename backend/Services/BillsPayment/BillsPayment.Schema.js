import mongoose from 'mongoose';

const invoiceItemSchema = new mongoose.Schema({
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalService', required: true },
    description: String,
    amount: { type: Number, required: true }
}, { _id: false });

const insuranceClaimSchema = new mongoose.Schema({
    provider: String,
    policyNumber: String,
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'submitted'], default: 'pending' },
    submittedAt: Date,
    resolvedAt: Date,
    notes: String
}, { _id: false });

export const billSchema = new mongoose.Schema({
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [invoiceItemSchema],
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['unpaid', 'paid', 'failed'], default: 'unpaid' },
    paymentMethod: { type: String, enum: ['card', 'upi', 'netbanking', 'cash', 'insurance'], default: 'card' },
    paymentDetails: { type: Object, default: {} },
    insuranceClaim: insuranceClaimSchema,
}, { timestamps: true });
