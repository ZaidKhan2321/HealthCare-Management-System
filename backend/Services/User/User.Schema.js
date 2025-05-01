import mongoose from 'mongoose' ;
import bcrypt from 'bcrypt' ;

export const userSchema = new mongoose.Schema({
    name : {
        type: String,
        trim: true,
        required: true,
        maxLength: [32, "Name can't be of more than 32 characters."]
    },
    email : {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password : {
        type : String,
        required : true
    },
    about:{
        type: String,
        trim: true
    },
    role : {
        type : Number,
        enum : [0, 1, 2],
        required : true
    },
    details:{
        type: Object,
        default: {}
    },
}, {timestamps:true}) ;


userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password) ;
} ;

userSchema.pre('save', async function(next){
    // If password is not modified, skip to next
    if (!this.isModified('password')){
        next() ;
    }
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_ROUNDS)) ;
    this.password = await bcrypt.hash(this.password, salt) ;
}) ;