const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
    const authHeader  = req.headers['authorization'];
    const token = authHeader.split(" ")[1]
    if(!token){
        return res.status(401).json({message:"No Token Provided"})
    }
    jwt.verify(token.replace('Bearer',''),process.env.SECRET_KEY,(err,decoded)=>{
        if(err){
            return res.status(403).json({error:err,message:"User Not Authorized"})
        }
        req.user=decoded
        next()
    })

}
module.exports=verifyToken

