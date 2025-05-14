import express from 'express';
import NotificationController from './Notification.Controller.js';
import { jwtAuth } from '../../Middlewares/jwt.auth.js';

const router = express.Router();
const controller = new NotificationController();

// Send notification (internal use or admin)
router.post('/send', jwtAuth, (req, res) => controller.sendNotification(req, res));

// Get all notifications for the logged-in user
router.get('/', jwtAuth, (req, res) => controller.getUserNotifications(req, res));

// Mark a notification as read
router.put('/read/:notificationId', jwtAuth, (req, res) => controller.markAsRead(req, res));

// Mark all as read
router.put('/read-all', jwtAuth, (req, res) => controller.markAllAsRead(req, res));

export default router;
