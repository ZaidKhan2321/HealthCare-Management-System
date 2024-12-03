import jwt from 'jsonwebtoken' ;

export const jwtAuth = (req, res, next)=>{
    const token = req.cookies.jwtToken ;
    if(!token){
        return res.status(401).send("Unauthorized") ;
    }
    try{
        jwt.verify(token, process.env.JWT_SECRET) ;
    }catch(err){
        console.log("Unauthorized") ;
    }
    next() ;
} ;