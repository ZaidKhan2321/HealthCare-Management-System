import express from 'express';
import DoctorController from './Doctor.Controller.js';
import { jwtAuth, docAuth } from '../../Middlewares/jwt.auth.js';

const router = express.Router();
const controller = new DoctorController();

// Doctor Profile CRUD
router.post('/profile', jwtAuth, docAuth, (req, res) => controller.createProfile(req, res));
router.get('/profile', jwtAuth, docAuth, (req, res) => controller.getProfile(req, res));
router.put('/profile', jwtAuth, docAuth, (req, res) => controller.updateProfile(req, res));
router.delete('/profile', jwtAuth, docAuth, (req, res) => controller.deleteProfile(req, res));

// Schedule Management
router.put('/schedule', jwtAuth, docAuth, (req, res) => controller.updateSchedule(req, res));

export default router;
