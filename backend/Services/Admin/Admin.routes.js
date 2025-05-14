import express from 'express';
import AdminController from './Admin.Controller.js';
import { jwtAuth, adminAuth } from '../../Middlewares/jwt.auth.js';

const router = express.Router();
const controller = new AdminController();

// User Management
router.get('/users', jwtAuth, adminAuth, (req, res) => controller.getAllUsers(req, res));
router.put('/approve/:userId', jwtAuth, adminAuth, (req, res) => controller.approveUser(req, res));
router.put('/deactivate/:userId', jwtAuth, adminAuth, (req, res) => controller.deactivateUser(req, res));

// Role Management
router.put('/role/:userId', jwtAuth, adminAuth, (req, res) => controller.updateUserRole(req, res));

// System Dashboard
router.get('/dashboard', jwtAuth, adminAuth, (req, res) => controller.getSystemStats(req, res));

export default router;
