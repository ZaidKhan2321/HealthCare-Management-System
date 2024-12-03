import express from 'express' ;
import UserController from './User.Controller.js';

const router = express.Router() ;
const userController = new UserController() ;

router.post("/login", (req,res)=>{
    userController.login(req,res) ;
}) ;

router.post("/signup", (req,res)=>{
    userController.signup(req,res) ;
}) ;

export default router ;
