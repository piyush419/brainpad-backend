const jwt = require("jsonwebtoken");
function verifyToken(req,res,next){
    const token = req.headers['authorization'];
  
    if(!token) res.status(403).json({message:"Access Denied"})
    try{
        const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = verified;
        next()
    }catch(error){
         console.log("error while verifying the token",error)
         res.status(401).json({message:"Invalid token"})
    }
}

module.exports = verifyToken