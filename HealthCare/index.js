import './env.js' ;
import express from 'express' ;
import UserRouter from './User/User.routes.js' ;
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { jwtAuth } from './Middlewares/jwt.auth.js';

const app = express() ;
app.use(bodyParser.json()) ;
app.use(cookieParser()) ;

app.use('/api/user', UserRouter) ;
// For any request other than login and signup I need authorization middleware
app.use('/', jwtAuth) ;

export default app ;