import express from 'express';
import MedicalServiceController from './MedicalService.Controller.js';
import { jwtAuth, adminAuth } from '../../Middlewares/jwt.auth.js';

const router = express.Router();
const controller = new MedicalServiceController();

// Admin-only routes
router.post('/', jwtAuth, adminAuth, (req, res) => controller.createService(req, res));
router.get('/', jwtAuth, adminAuth, (req, res) => controller.getServices(req, res));
router.put('/:serviceId', jwtAuth, adminAuth, (req, res) => controller.updateService(req, res));
router.put('/pricing/:serviceId', jwtAuth, adminAuth, (req, res) => controller.updateServicePricing(req, res));
router.delete('/:serviceId', jwtAuth, adminAuth, (req, res) => controller.deleteService(req, res));

export default router;
