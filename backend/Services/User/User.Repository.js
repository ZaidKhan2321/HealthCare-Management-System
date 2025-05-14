import mongoose from 'mongoose' ;
import { userSchema } from './User.Schema.js';
const UserModel = mongoose.model('User', userSchema) ;

export default class UserRepository{

    async getUserData(userId){
        return await UserModel.findById(userId).select('-password') ;
    }

    async findAll(){
        const users = await UserModel.find({}) ;
        return users ;
    }

    async find(email){
        return await UserModel.findOne({email}) ;
    }

    async find_Auth(email, password){
        const userExists = await UserModel.findOne({email}) ;
        let pwdMatch = false ;
        if(userExists){
            pwdMatch = await userExists.matchPassword(password) ;
        }
        return {userExists, pwdMatch} ;
    }

    async newUser(name, email, password, role){
        const newUser = new UserModel({name, email, password, role}) ;
        await newUser.save() ;
        return newUser ;
    }

    async login(email){
        try{
            const user = await UserModel.findOne({email}) ;
            return user ;
        }catch(err){
            console.log(err.message) ;
        }
    }

    async updateUser(userId, name, email, password){
        const user = await UserModel.findById(userId) ;
        if(user){
            user.name = name || user.name ;
            user.email = email || user.email ;
            if(password){
                user.password = password ;
            } 
        }
        return await user.save() ;
    }

    async updateAnyUser(userId, name, email, password, role){
        const user = await UserModel.findById(userId) ;
        if(user){
            user.name = name || user.name ;
            user.email = email || user.email ;
            user.role = role || user.role ;
            if(password){
                user.password = password ;
            }
        }
        return await user.save() ;
    }

    async deleteUser(userId){
        return await UserModel.findOneAndDelete(userId) ;
    }

    async findUsersByIds(userIds) {
        return await UserModel.find({ _id: { $in: userIds } });
    }

    async findUsersByName(name) {
        return await UserModel.find({
            name: { $regex: name, $options: 'i' }
        });
    }

}