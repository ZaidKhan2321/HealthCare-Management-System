import mongoose from 'mongoose';
import { feedbackRatingSchema } from './FeedbackRating.Schema.js';

const FeedbackRatingModel = mongoose.model('FeedbackRating', feedbackRatingSchema);

export default class FeedbackRatingRepository {
    async leaveFeedback(data) {
        // Prevent duplicate feedback from the same patient for the same doctor/service
        const existing = await FeedbackRatingModel.findOne({
            patientId: data.patientId,
            doctorId: data.doctorId,
            serviceId: data.serviceId
        });
        if (existing) throw new Error('Feedback already submitted for this doctor/service.');
        const feedback = new FeedbackRatingModel(data);
        return await feedback.save();
    }

    async getDoctorFeedback(doctorId) {
        return await FeedbackRatingModel.find({ doctorId })
            .populate('patientId', 'name')
            .sort({ createdAt: -1 });
    }

    async getServiceFeedback(serviceId) {
        return await FeedbackRatingModel.find({ serviceId })
            .populate('patientId', 'name')
            .populate('doctorId', 'name')
            .sort({ createdAt: -1 });
    }

    async getDoctorAverageRating(doctorId) {
        const result = await FeedbackRatingModel.aggregate([
            { $match: { doctorId: new mongoose.Types.ObjectId(doctorId) } },
            { $group: { _id: '$doctorId', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
        ]);
        return result[0] || { avgRating: 0, count: 0 };
    }

    async getServiceAverageRating(serviceId) {
        const result = await FeedbackRatingModel.aggregate([
            { $match: { serviceId: new mongoose.Types.ObjectId(serviceId) } },
            { $group: { _id: '$serviceId', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
        ]);
        return result[0] || { avgRating: 0, count: 0 };
    }

    async getDoctorRating(doctorId) {
        const feedback = await FeedbackRatingModel.findOne({ doctorId });
        return feedback ? feedback.rating : null;
    }
}
