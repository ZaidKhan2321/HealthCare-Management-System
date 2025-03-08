import './utils/env.js' ;

// import packages
import express from 'express' ;
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from "cors" ;

// import routes
import UserRouter from './User/User.routes.js' ;

// import utilities

const app = express() ;

// CORS POLICY OPTIONS
const corsOptions = {
    origin: '*',
    allowedHeaders: "Content-Type,  Access-Control-Allow-Headers, Authorization, X-Requested-With",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    maxAge: 3600,
} ;

// Middlewares
app.use(cors(corsOptions)) ;
app.use(bodyParser.json()) ;
app.use(cookieParser()) ;

app.use('/api/user', UserRouter) ;

export default app ;