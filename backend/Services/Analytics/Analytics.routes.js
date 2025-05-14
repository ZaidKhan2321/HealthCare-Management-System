import express from 'express';
import AnalyticsController from './Analytics.Controller.js';
import { jwtAuth, adminAuth } from '../../Middlewares/jwt.auth.js';

const router = express.Router();
const controller = new AnalyticsController();

// User stats
router.get('/users', jwtAuth, adminAuth, (req, res) => controller.getUserStats(req, res));

// Appointment stats (optionally filter by date range)
router.get('/appointments', jwtAuth, adminAuth, (req, res) => controller.getAppointmentStats(req, res));

// Revenue stats (optionally filter by date range)
router.get('/revenue', jwtAuth, adminAuth, (req, res) => controller.getRevenueStats(req, res));

// Recent analytics logs
router.get('/logs', jwtAuth, adminAuth, (req, res) => controller.getRecentLogs(req, res));

export default router;
