import NotificationRepository from './Notification.Repository.js';

export default class NotificationController {
    constructor() {
        this.repo = new NotificationRepository();
    }

    // Send a notification (can be called from other services)
    async sendNotification(req, res) {
        try {
            const { userId, type, title, message, data } = req.body;
            const notification = await this.repo.createNotification({ userId, type, title, message, data });
            return res.status(201).json(notification);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    // Get all notifications for the logged-in user
    async getUserNotifications(req, res) {
        try {
            const userId = req.user._id;
            const notifications = await this.repo.getUserNotifications(userId);
            return res.status(200).json(notifications);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    // Mark a notification as read
    async markAsRead(req, res) {
        try {
            const { notificationId } = req.params;
            const updated = await this.repo.markAsRead(notificationId);
            return res.status(200).json(updated);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    // Mark all notifications as read for the logged-in user
    async markAllAsRead(req, res) {
        try {
            const userId = req.user._id;
            await this.repo.markAllAsRead(userId);
            return res.status(200).json({ message: 'All notifications marked as read' });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }
}
