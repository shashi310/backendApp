const jwt = require('jsonwebtoken')
// const { blacklist } = require('../blacklist')

const auth=(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]

    if(token){
    //     if(blacklist.includes(token)){
    //         res.send({"msg":"Please login again"})
    // }

        jwt.verify(token,"secretKey",(err,decoded)=>{
            if(decoded){
            console.log(decoded);
            req.body.userID=decoded.userID
            req.body.user=decoded.user
            next()
            }else{
                res.send({"msg":"token expired with error "+ err})
            }
        }) 
    
}else{
    res.send({"msg":"please login again!!"})
}
   
}

module.exports = {
    auth
}