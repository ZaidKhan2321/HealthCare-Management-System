import CommunicationRepository from './Communication.Repository.js';

export default class CommunicationController {
    constructor() {
        this.repo = new CommunicationRepository();
    }

    // Messaging
    async sendMessage(req, res) {
        try {
            const senderId = req.user._id;
            const { receiverId, content } = req.body;
            if (!receiverId || !content) {
                return res.status(400).json({ message: 'Receiver and content required' });
            }
            const msg = await this.repo.sendMessage({ senderId, receiverId, content });
            return res.status(201).json(msg);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async getConversation(req, res) {
        try {
            const userId1 = req.user._id;
            const { userId2 } = req.params;
            const conversation = await this.repo.getConversation(userId1, userId2);
            return res.status(200).json(conversation);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async getUserChats(req, res) {
        try {
            const userId = req.user._id;
            const chats = await this.repo.getUserChats(userId);
            return res.status(200).json(chats);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    // Telemedicine Sessions
    async createSession(req, res) {
        try {
            const { patientId, doctorId, scheduledAt, duration, sessionType, joinLink, notes } = req.body;
            if (!patientId || !doctorId || !scheduledAt || !sessionType) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            const session = await this.repo.createSession({
                patientId, doctorId, scheduledAt, duration, sessionType, joinLink, notes
            });
            return res.status(201).json(session);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async getSessionById(req, res) {
        try {
            const session = await this.repo.getSessionById(req.params.sessionId);
            if (!session) return res.status(404).json({ message: 'Session not found' });
            // Only allow patient or doctor to view
            if (
                session.patientId._id.toString() !== req.user._id.toString() &&
                session.doctorId._id.toString() !== req.user._id.toString()
            ) {
                return res.status(403).json({ message: 'Not authorized' });
            }
            return res.status(200).json(session);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async getUserSessions(req, res) {
        try {
            const userId = req.user._id;
            const sessions = await this.repo.getUserSessions(userId);
            return res.status(200).json(sessions);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async updateSession(req, res) {
        try {
            const sessionId = req.params.sessionId;
            const session = await this.repo.getSessionById(sessionId);
            if (!session) return res.status(404).json({ message: 'Session not found' });
            // Only patient or doctor can update
            if (
                session.patientId._id.toString() !== req.user._id.toString() &&
                session.doctorId._id.toString() !== req.user._id.toString()
            ) {
                return res.status(403).json({ message: 'Not authorized' });
            }
            const updated = await this.repo.updateSession(sessionId, req.body);
            return res.status(200).json(updated);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }
}
