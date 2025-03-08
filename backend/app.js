import app from './index.js' ;
import { connectingUsingMongoose } from './config/mongooseConfig.js';

const port = process.env.PORT || 8000 ;
app.listen(port, ()=>{
    console.log(`App running at port ${port}`) ;
    connectingUsingMongoose() ;
}) ;