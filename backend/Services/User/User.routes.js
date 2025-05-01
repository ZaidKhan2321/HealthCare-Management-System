import express from 'express' ;
import UserController from './User.Controller.js';
import { jwtAuth, adminAuth } from '../../Middlewares/jwt.auth.js';

const router = express.Router() ;
const userController = new UserController() ;

// PUBLIC
router.post('/signup', (req,res)=> userController.registerUser(req,res)) ;
router.post('/signin', (req,res)=> userController.authUser(req,res)) ;
router.get('/', jwtAuth, (req,res)=> userController.getUserProfile(req,res)) ;
router.put('/update', jwtAuth, (req,res)=> userController.updateUserProfile(req,res)) ;
router.post('/logout', jwtAuth, (req,res)=> userController.logout(req,res)) ;
// ADMIN
router.get('/other/:userId', jwtAuth, adminAuth, (req,res)=> userController.getUserByIdForAdmin(req,res));
router.get('/users', jwtAuth, adminAuth, (req,res)=> userController.getAllUsers(req,res));
router.put('/update/:userId', jwtAuth, adminAuth, (req,res)=> userController.updateUserByAdmin(req,res)) ;
router.delete('/delete/:userId', jwtAuth, adminAuth, (req,res)=> userController.deleteUserByAdmin(req,res)) ;

export default router ;