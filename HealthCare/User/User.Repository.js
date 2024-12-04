import mongoose from 'mongoose' ;
import { userSchema } from './User.Schema.js';
import { ObjectId } from 'mongodb';

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

    async addDetails(userId, name, age, gender, phoneNo){
        const user = await UserModel.findByIdAndUpdate(userId, {name, age, gender, phone_number : phoneNo}, {new : true}) ;
        return user ;
    }
}