const jwt = require('jsonwebtoken');

const jwtauthmiddleware=(req,res,next)=>{
     // first check request headers has authorization or not
     const authorization=req.headers.authorization
     if(!authorization) return res.status(401).json({error:"Token Not Found"})
     //exact the jwt token in headers

     const token=req.headers.authorization.split(' ')[1]
     if(!token){
        return res.status(401).json({error:"unauthorized"})
     }
     try{
        //verfiy token
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
     }catch(err){
         console.log(err)
         res.status(401).json({error:"Invaild Token"})
     }
}
//generate tooken
const generatetoken=(userData)=>{
     return jwt.sign({userData},process.env.JWT_SECRET,{expiresIn:3000})
}

module.exports={jwtauthmiddleware,generatetoken}