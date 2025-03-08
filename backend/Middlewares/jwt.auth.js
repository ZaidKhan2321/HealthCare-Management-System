import jwt from 'jsonwebtoken' ;
import { verifyToken } from '../utils/generateToken.js';
import UserRepository from '../User/User.Repository.js';

const userRepository = new UserRepository() ;

export const jwtAuth = async (req, res, next)=>{
    try{
        const token = req.cookies.jwtToken ;
        if(!token){
            res.status(401) ;
            throw new Error('Not authorized, no token present') ;
        }
        const id = verifyToken(token).id ;
        req.user = await userRepository.getUserData(id) ;
        next() ;
    }catch(err){
        console.log(`err: ${err.message}`) ;
        return res.status(401).json({
            message: err.message
        }) ;
    }
} ;

export const adminAuth = (req, res, next)=>{
    if(req.user && req.user.role === 0){
        next() ;
    }else{
        res.status(401) ;
        throw new Error('Not authorized as an admin') ;
    }
} ;
