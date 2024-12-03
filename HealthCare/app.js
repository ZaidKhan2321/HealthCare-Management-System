import app from './index.js' ;
import { connectingUsingMongoose } from './config/mongooseConfig.js';

app.listen(3000, ()=>{
    console.log("App running at port 3000") ;
    connectingUsingMongoose() ;
}) ;