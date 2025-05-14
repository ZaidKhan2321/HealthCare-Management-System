import UserRepository from "./User.Repository.js";
import {generateToken, verifyToken} from '../../utils/generateToken.js' ;

export default class UserController{
    constructor(){
        this.userRepository = new UserRepository() ;
    }
    // -------------------------------------------------------------------------------------------------------------------
    // @desc    A user wants to see it's user's Profile
    // @route   GET /api/user
    // @access  Doctor/Patient
    async getUserProfile(req, res){
        try{
            const userId = req.user._id;
            if(!userId){
                res.status(400) ;
                throw new Error('Unauthorized actions') ;
            }
            const userData = await this.userRepository.getUserData(userId) ;
            if(!userData){
                res.status(404) ;
                throw new Error('User not found') ;
            }
            return res.status(200).json(userData) ;
        }catch(err){
            console.log(`err: ${err.message}`) ;
            return res.json({
                message: err.message
            }) ;
        }
    }
    // -------------------------------------------------------------------------------------------------------------------
    // @desc    Admin wants to see data of users by their userId
    // @route   GET /api/user/other/:userId
    // @access  ADMIN
    async getUserByIdForAdmin(req, res){
        try{
            const userId = req.params.userId ;
            const userData = await this.userRepository.getUserData(userId) ;
            if(!userData){
                res.status(404) ;
                throw new Error('User not found') ;
            }
            return res.status(200).json({
                _id: userData._id,
                name: userData.name,
                email: userData.email,
                role: userData.role
            }) ;
        }catch(err){
            console.log(`err: ${err.message}`) ;
            return res.json({
                message: err.message
            }) ;
        }
    }
    // -------------------------------------------------------------------------------------------------------------------
    // @desc    Admin wants to see all the user's data
    // @route   GET /api/users
    // @access  ADMIN
    async getAllUsers(req, res){
        try{
            const usersData = await this.userRepository.findAll() ;
            return res.status(200).json(usersData) ;
        }catch(err){
            console.log(`err: ${err.message}`) ;
            return res.json({
                message: err.message
            }) ;
        }
    }
    // -------------------------------------------------------------------------------------------------------------------
    // @desc    Register a new User
    // @route   POST /api/user/signup
    // access   PUBLIC to everyone
    async registerUser(req, res){
        try{
            const {name, email, password, role} = req.body ;
            const userExists = await this.userRepository.find(email) ;
            if(userExists){
                res.status(400) ;
                throw new Error('User already exists') ;
            }
            const newUser = await this.userRepository.newUser(name, email, password, role) ;
            if(newUser){
                const tkn = generateToken(newUser._id) ;
                const data = {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                    token: tkn
                } ;
                return res.status(201).cookie('jwtToken', tkn, {maxAge: 2*24*60*60*1000}).json(data) ;
            }else{
                res.status(400) ;
                throw new Error('Invalid user data') ;
            }
        }catch(err){
            console.log(`err: ${err.message}`) ;
            return res.json({
                message: err.message
            }) ;
        }
    }
    // -------------------------------------------------------------------------------------------------------
    // @desc    Authorize user & LOGIN the user
    // @route   POST /api/user/signin
    // access   PUBLIC to everyone
    async authUser(req, res){
        try{
            const {email, password} = req.body ;
            const {userExists, pwdMatch} = await this.userRepository.find_Auth(email, password) ;
            if(!userExists){
                res.status(400) ;
                throw new Error('Invalid Email') ;
            }
            if(userExists && !pwdMatch){
                res.status(400) ;
                throw new Error('Wrong credentials') ;
            }
            const tkn = generateToken(userExists._id) ;
            const data = {
                _id: userExists._id,
                name: userExists.name,
                email: userExists.email,
                role: userExists.role,
                token: tkn
            } ;
            return res.status(200).cookie('jwtToken', tkn, {maxAge: 2*24*60*60*1000}).json(data) ;
        }catch(err){
            console.log(`err: ${err.message}`) ;
            return res.json({
                message: err.message
            }) ;
        }
    }
    // -----------------------------------------------------------------------------------------------
    // @desc A user can update it's profile
    // @route PUT /api/user/update
    // @access PUBLIC to logged in users
    async updateUserProfile(req, res){
        try{
            const userId = req.user._id ;
            const {name, email, password} = req.body ;
            const updatedUser = await this.userRepository.updateUser(userId, name, email, password) ;
            if(!updatedUser){
                res.status(404) ;
                throw new Error('User not found') ;
            }
            return res.status(201).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role
            }) ;
        }catch(err){
            console.log(`err: ${err.message}`) ;
            return res.json({
                message: err.message
            }) ;
        }
    }
    // ----------------------------------------------------------------------------------------------
    // @desc Admin can update user's info
    // @route PUT /api/user/update/:userId
    // @access ADMIN
    async updateUserByAdmin(req, res){
        try{
            const userId = req.params.userId ;
            const {name, email, password, role} = req.body ;
            const updatedUser = await this.userRepository.updateAnyUser(userId, name, email, password, role) ;
            if(!updatedUser){
                res.status(404) ;
                throw new Error('User not found') ;
            }
            return res.status(201).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role
            }) ;
        }catch(err){
            console.log(`err: ${err.message}`) ;
            return res.json({
                message: err.message
            }) ;
        }
    }
    // ----------------------------------------------------------------------------------------------
    // @desc Admin can delete any user
    // @route DELETE /api/user/delete/:userId
    // @access ADMIN
    async deleteUserByAdmin(req, res){
        try{
            const userId = req.params.userId ;
            const removedUser = await this.userRepository.deleteUser(userId) ;
            if(!removedUser){
                res.status(404) ;
                throw new Error('User not found') ;
            }
            return res.status(200).json({
                message: 'User removed'
            }) ;
        }catch(err){
            console.log(`err: ${err.message}`) ;
            return res.json({
                message: err.message
            }) ;
        }
    }
    // ----------------------------------------------------------------------------------------------
    // @desc Logging users out
    // @route POST /api/user/logout
    // @access PUBLIC to logged in users
    async logout(req, res){
        try{
            const userId = req.user._id ;
            const user = await this.userRepository.getUserData(userId) ;
            if(!user){
                res.status(404) ;
                throw new Error('User does not exist') ;
            }
            res.clearCookie('jwtToken') ;
            return res.status(200).json({
                message: 'Logged out successfully'
            }) ;
        }catch(err){
            console.log(`err: ${err.message}`) ;
            return res.json({
                message: err.message
            }) ;
        }
    }
}