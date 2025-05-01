import express from 'express';
import PatientController from './Patient.Controller.js';
import { jwtAuth, patAuth } from '../../Middlewares/jwt.auth.js';

const router = express.Router();
const controller = new PatientController();

// Patient Profile CRUD
router.post('/profile', jwtAuth, patAuth, (req, res) => controller.createProfile(req, res));
router.get('/profile', jwtAuth, patAuth, (req, res) => controller.getProfile(req, res));
router.put('/profile', jwtAuth, patAuth, (req, res) => controller.updateProfile(req, res));
router.delete('/profile', jwtAuth, patAuth, (req, res) => controller.deleteProfile(req, res));

// Medical History
router.put('/medical-history', jwtAuth, patAuth, (req, res) => controller.updateMedicalHistory(req, res));

// EHR(Electronic Health Records)
router.put('/ehr', jwtAuth, patAuth, (req, res) => controller.updateEHR(req, res));

export default router;
