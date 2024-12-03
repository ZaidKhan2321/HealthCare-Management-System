import UserRepository from "./User.Repository.js";
import jwt from 'jsonwebtoken' ;
import bcrypt from 'bcrypt' ;

export default class UserController{
    constructor(){
        this.userRepository = new UserRepository() ;
    }

    async login(req, res){
        const {email, password} = req.body ;
        const validUser = await this.userRepository.login(email) ;
        if(!validUser){
            return res.status(400).send("Invalid Email") ;
        }
        const result = await bcrypt.compare(password, validUser.password) ;
        if(!result){
            return res.status(400).send("Wrong credentials") ;
        }

        const token = jwt.sign(
            {
                userId : validUser.id,
                email : validUser.email,
                userType : validUser.user_type
            },
            process.env.JWT_SECRET,
            {expiresIn : '1h'}
        ) ;
        return res.status(200).cookie('jwtToken', token, {
            maxAge : 2*24*60*60*1000
        }).send("Login Successful") ;
    }
    // For first time users
    async signup(req, res){
        const {email, password, userType} = req.body ;
        const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS)) ;
        const newUser = await this.userRepository.signup(email, hashedPassword, userType) ;
        return res.status(201).json(newUser) ;
    }
}