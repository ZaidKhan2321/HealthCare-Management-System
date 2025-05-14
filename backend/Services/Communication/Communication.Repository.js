import mongoose from 'mongoose';
import { messageSchema, sessionSchema } from './Communication.Schema.js';

const MessageModel = mongoose.model('Message', messageSchema);
const SessionModel = mongoose.model('Session', sessionSchema);

export default class CommunicationRepository {
    // Messaging
    async sendMessage(data) {
        const msg = new MessageModel(data);
        return await msg.save();
    }

    async getConversation(userId1, userId2) {
        return await MessageModel.find({
            $or: [
                { senderId: userId1, receiverId: userId2 },
                { senderId: userId2, receiverId: userId1 }
            ]
        }).sort({ sentAt: 1 });
    }

    async getUserChats(userId) {
        return await MessageModel.find({
            $or: [{ senderId: userId }, { receiverId: userId }]
        }).sort({ sentAt: -1 });
    }

    // Telemedicine Sessions
    async createSession(data) {
        const session = new SessionModel(data);
        return await session.save();
    }

    async getSessionById(sessionId) {
        return await SessionModel.findById(sessionId)
            .populate('patientId', 'name email')
            .populate('doctorId', 'name email');
    }

    async getUserSessions(userId) {
        return await SessionModel.find({
            $or: [{ patientId: userId }, { doctorId: userId }]
        }).sort({ scheduledAt: -1 });
    }

    async updateSession(sessionId, updateData) {
        return await SessionModel.findByIdAndUpdate(
            sessionId,
            { $set: updateData },
            { new: true }
        );
    }
}
