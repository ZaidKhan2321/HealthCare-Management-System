import express from 'express';
import PublicController from './User.PublicController.js';

const router = express.Router();
const controller = new PublicController();

// Public: Get all doctors' public info
router.get('/doctors', (req, res) => controller.getAllDoctorsPublicInfo(req, res));

export default router;
