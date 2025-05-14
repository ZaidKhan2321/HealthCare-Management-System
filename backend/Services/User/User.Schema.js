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
    details:{
        type: Object,
        default: {}
    },
    role: {
        type: Number,
        enum: [0, 1, 2], // 0=admin, 1=doctor, 2=patient
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isApproved: {
        type: Boolean,
        default: false // For doctor approvals
    }
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