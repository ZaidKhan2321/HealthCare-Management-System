import BillsPaymentRepository from './BillsPayment.Repository.js';
// import your payment gateway SDK as needed (e.g., Stripe/PayPal)

export default class BillsPaymentController {
    constructor() {
        this.repo = new BillsPaymentRepository();
    }

    // Generate invoice for an appointment
    async generateInvoice(req, res) {
        try {
            const { appointmentId, patientId, doctorId, items, totalAmount, paymentMethod, insuranceClaim } = req.body;
            const invoice = await this.repo.createInvoice({
                appointmentId, patientId, doctorId, items, totalAmount, paymentMethod, insuranceClaim
            });
            return res.status(201).json(invoice);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    // Get invoice by ID
    async getInvoice(req, res) {
        try {
            const invoice = await this.repo.getInvoiceById(req.params.billId);
            if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
            return res.status(200).json(invoice);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    // Get all invoices for a patient
    async getPatientInvoices(req, res) {
        try {
            const invoices = await this.repo.getInvoicesByPatient(req.user._id);
            return res.status(200).json(invoices);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    // Get all invoices for a doctor
    async getDoctorInvoices(req, res) {
        try {
            const invoices = await this.repo.getInvoicesByDoctor(req.user._id);
            return res.status(200).json(invoices);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    // Payment processing (mock)
    async processPayment(req, res) {
        try {
            const { billId, paymentDetails } = req.body;
            // Here you would integrate with Stripe/PayPal, etc.
            // For now, we mock a successful payment:
            const updated = await this.repo.updateInvoice(billId, {
                paymentStatus: 'paid',
                paymentDetails
            });
            return res.status(200).json(updated);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    // Insurance claim submission
    async submitInsuranceClaim(req, res) {
        try {
            const { billId, insuranceClaim } = req.body;
            const updated = await this.repo.updateInvoice(billId, {
                'insuranceClaim.status': 'submitted',
                'insuranceClaim.submittedAt': new Date(),
                'insuranceClaim.provider': insuranceClaim.provider,
                'insuranceClaim.policyNumber': insuranceClaim.policyNumber,
                'insuranceClaim.notes': insuranceClaim.notes
            });
            return res.status(200).json(updated);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    // Admin: Get all invoices
    async getAllInvoices(req, res) {
        try {
            const invoices = await this.repo.getAllInvoices();
            return res.status(200).json(invoices);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}
