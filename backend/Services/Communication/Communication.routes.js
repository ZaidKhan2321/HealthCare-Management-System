import express from 'express';
import CommunicationController from './Communication.Controller.js';
import { jwtAuth, docAuth, patAuth } from '../../Middlewares/jwt.auth.js';

const router = express.Router();
const controller = new CommunicationController();

// Messaging (doctor or patient)
router.post('/message', jwtAuth, (req, res) => controller.sendMessage(req, res));
router.get('/conversation/:userId2', jwtAuth, (req, res) => controller.getConversation(req, res));
router.get('/chats', jwtAuth, (req, res) => controller.getUserChats(req, res));

// Telemedicine Sessions
router.post('/session', jwtAuth, (req, res) => controller.createSession(req, res));
router.get('/session/:sessionId', jwtAuth, (req, res) => controller.getSessionById(req, res));
router.get('/sessions', jwtAuth, (req, res) => controller.getUserSessions(req, res));
router.put('/session/:sessionId', jwtAuth, (req, res) => controller.updateSession(req, res));

export default router;
