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

// import utilities

const app = express();

// CORS POLICY OPTIONS
const corsOptions = {
  origin: process.env.CLIENT_URL,
  allowedHeaders:
    "Content-Type,  Access-Control-Allow-Headers, Authorization, X-Requested-With",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  maxAge: 3600,
};

// Middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/user", UserRouter);
app.use("/api/patient", PatientRouter);
app.use("/api/doctor", DoctorRouter);
app.use("/api/appointment", AppointmentRouter);

export default app;
