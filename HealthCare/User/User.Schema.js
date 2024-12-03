import mongoose from 'mongoose' ;

export const userSchema = new mongoose.Schema({
    name : {
        type : String,
        maxLength : [30, "Name can't be of more than 30 characters."]
    },
    age : {
        type : Number,
        MinKey : [0, "Age can't be negative"]
    },
    gender : {
        type : String,
        enum : ["Male", "Female"]
    },
    phone_number : {
        type : Number,
        MinKey : [0, "Phone number can't be negative"]
    },
    registered_on : {
        type : Date,
        default : Date.now()
    },
    user_type : {
        type : String,
        enum : ["Doctor", "Patient"],
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    profile_img : {
        type : Buffer
    }
}) ;