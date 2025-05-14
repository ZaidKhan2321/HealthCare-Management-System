import express from 'express';
import FeedbackRatingController from './FeedbackRating.Controller.js';
import { jwtAuth, patAuth } from '../../Middlewares/jwt.auth.js';

const router = express.Router();
const controller = new FeedbackRatingController();

// Patients leave feedback/rating for a doctor/service
router.post('/', jwtAuth, patAuth, (req, res) => controller.leaveFeedback(req, res));

// Public: Get feedback and average rating for a doctor
router.get('/doctor/:doctorId', jwtAuth, (req, res) => controller.getDoctorFeedback(req, res));

// Public: Get feedback and average rating for a service
router.get('/service/:serviceId', jwtAuth, (req, res) => controller.getServiceFeedback(req, res));

export default router;
