import FeedbackRatingRepository from './FeedbackRating.Repository.js';

export default class FeedbackRatingController {
    constructor() {
        this.repo = new FeedbackRatingRepository();
    }

    // Patients leave feedback for a doctor/service
    async leaveFeedback(req, res) {
        try {
            const patientId = req.user._id;
            const { doctorId, serviceId, rating, feedback } = req.body;
            if (!doctorId || !rating) {
                return res.status(400).json({ message: 'Doctor and rating are required.' });
            }
            const saved = await this.repo.leaveFeedback({ patientId, doctorId, serviceId, rating, feedback });
            return res.status(201).json(saved);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    // Get all feedback for a doctor
    async getDoctorFeedback(req, res) {
        try {
            const { doctorId } = req.params;
            const feedbacks = await this.repo.getDoctorFeedback(doctorId);
            const avg = await this.repo.getDoctorAverageRating(doctorId);
            return res.status(200).json({ feedbacks, averageRating: avg.avgRating, total: avg.count });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    // Get all feedback for a service
    async getServiceFeedback(req, res) {
        try {
            const { serviceId } = req.params;
            const feedbacks = await this.repo.getServiceFeedback(serviceId);
            const avg = await this.repo.getServiceAverageRating(serviceId);
            return res.status(200).json({ feedbacks, averageRating: avg.avgRating, total: avg.count });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}
