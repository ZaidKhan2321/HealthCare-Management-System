import mongoose from 'mongoose';

const pricingSchema = new mongoose.Schema({
    basePrice: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative']
    },
    insuranceCovered: {
        type: Boolean,
        default: false
    },
    discount: {
        type: Number,
        default: 0,
        min: [0, 'Discount cannot be negative'],
        max: [100, 'Discount cannot exceed 100%']
    }
}, { _id: false });

export const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['consultation', 'lab-test', 'procedure']
    },
    duration: {
        type: Number,
        required: true,
        min: [5, 'Minimum duration is 5 minutes']
    },
    pricing: pricingSchema,
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
