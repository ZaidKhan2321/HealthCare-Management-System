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
    
    async signup(req, res){
        const {email, password, userType} = req.body ;
        const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS)) ;
        const newUser = await this.userRepository.signup(email, hashedPassword, userType) ;
        const token = jwt.sign(
            {
                userId : newUser.id,
                email : newUser.email,
                userType : newUser.user_type
            },
            process.env.JWT_SECRET,
            {expiresIn : '1h'}
        ) ;
        return res.status(201).cookie('jwtToken', token, {
            maxAge : 2*24*60*60*1000
        }).json(newUser) ;
    }

    async addDetails(req, res){
        const {name, age, gender, phoneNo} = req.body ;
        const token = req.cookies.jwtToken ;
        const userId = jwt.verify(token, process.env.JWT_SECRET).userId ;
        const user = await this.userRepository.addDetails(userId, name, age, gender, phoneNo) ;
        if(!user){
            return res.status(404).send("User not found") ;
        }
        return res.status(200).json(user) ;
    }
}