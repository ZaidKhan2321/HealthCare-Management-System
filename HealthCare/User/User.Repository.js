import mongoose from 'mongoose' ;
import { userSchema } from './User.Schema.js';

const UserModel = mongoose.model('User', userSchema) ;

export default class UserRepository{

    async login(email){
        try{
            const user = await UserModel.findOne({email}) ;
            return user ;
        }catch(err){
            console.log(err.message) ;
        }
    }

    async signup(email, password, user_type){
        const newUser = new UserModel({email, password, user_type}) ;
        await newUser.save() ;
        return newUser ;
    }
}