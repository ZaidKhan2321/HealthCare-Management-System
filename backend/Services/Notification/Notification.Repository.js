import mongoose from 'mongoose';
import { notificationSchema } from './Notification.Schema.js';

const NotificationModel = mongoose.model('Notification', notificationSchema);

export default class NotificationRepository {
    async createNotification(notificationData) {
        const notification = new NotificationModel(notificationData);
        return await notification.save();
    }

    async getUserNotifications(userId) {
        return await NotificationModel.find({ userId }).sort({ sentAt: -1 });
    }

    async markAsRead(notificationId) {
        return await NotificationModel.findByIdAndUpdate(notificationId, { $set: { read: true } }, { new: true });
    }

    async markAllAsRead(userId) {
        return await NotificationModel.updateMany({ userId, read: false }, { $set: { read: true } });
    }
}
