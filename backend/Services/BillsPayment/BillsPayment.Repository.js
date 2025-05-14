import mongoose from 'mongoose';
import { billSchema } from './BillsPayment.Schema.js';

const BillModel = mongoose.model('Bill', billSchema);

export default class BillsPaymentRepository {
    async createInvoice(data) {
        const bill = new BillModel(data);
        return await bill.save();
    }

    async getInvoiceById(billId) {
        return await BillModel.findById(billId)
            .populate('appointmentId')
            .populate('patientId', 'name email')
            .populate('doctorId', 'name email')
            .populate('items.serviceId', 'name');
    }

    async getInvoicesByPatient(patientId) {
        return await BillModel.find({ patientId }).sort({ createdAt: -1 });
    }

    async getInvoicesByDoctor(doctorId) {
        return await BillModel.find({ doctorId }).sort({ createdAt: -1 });
    }

    async updateInvoice(billId, updateData) {
        return await BillModel.findByIdAndUpdate(
            billId,
            { $set: updateData },
            { new: true }
        );
    }

    async getAllInvoices() {
        return await BillModel.find({}).sort({ createdAt: -1 });
    }
}
