import "./utils/env.js";

// import packages
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

// import routes
import UserRouter from "./Services/User/User.routes.js";
import PatientRouter from "./Services/Patient/Patient.routes.js";
import DoctorRouter from "./Services/Doctor/Doctor.routes.js";
import AppointmentRouter from "./Services/Appointment/Appointment.routes.js";
import AdminRouter from "./Services/Admin/Admin.routes.js";
import MedicalServiceRouter from "./Services/MedicalService/MedicalService.routes.js";
import PrescriptionRouter from "./Services/Prescription/Prescription.routes.js";
import BillsPaymentRouter from "./Services/BillsPayment/BillsPayment.routes.js";
import COmmunicationRouter from "./Services/Communication/Communication.routes.js";
import CommunicationController from "./Services/Communication/Communication.Controller.js";
import FeedbackRatingRouter from "./Services/FeedbackRating/FeedbackRating.routes.js";
import NotificationRouter from "./Services/Notification/Notification.routes.js";
import AnalyticsRouter from "./Services/Analytics/Analytics.routes.js";
import PublicRoutes from "./Services/User/User.PublicRoutes.js";

// import utilities

const app = express();

// CORS POLICY OPTIONS
const corsOptions = {
  origin: process.env.CLIENT_URL,
  allowedHeaders:
    "Content-Type,  Access-Control-Allow-Headers, Authorization, X-Requested-With",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  maxAge: 3600,
  credentials: true
};

// Middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/user", UserRouter);
app.use("/api/patient", PatientRouter);
app.use("/api/doctor", DoctorRouter);
app.use("/api/appointment", AppointmentRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/medical-services", MedicalServiceRouter);
app.use("/api/prescription", PrescriptionRouter);
app.use("/api/billing", BillsPaymentRouter);
app.use("/api/communication", COmmunicationRouter);
app.use("/api/feedback", FeedbackRatingRouter);
app.use("/api/notification", NotificationRouter);
app.use("/api/analytics", AnalyticsRouter);
app.use("/api/public", PublicRoutes);

export default app;
