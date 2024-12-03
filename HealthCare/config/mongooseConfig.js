import mongoose from 'mongoose' ;

export const connectingUsingMongoose = async () => {
    try{
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser : true,
            useUnifiedTopology : true
        }) ;
        console.log("MongoDB connected using mongoose") ;
    }catch(err){
        console.log("Error connecting to mongoDB") ;
    }
} ;