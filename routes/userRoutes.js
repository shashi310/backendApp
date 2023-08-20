const express = require('express')
const {UserModel} = require("../models/userModel")
const jwt = require('jsonwebtoken')
const bcrypt= require('bcrypt')
// const {blacklist} = require("../blacklist")

const userRouter = express.Router()


// registration
userRouter.post('/register',async(req, res)=>{
const {username,email,pass}=req.body

try {
bcrypt.hash(pass, 5,async(err, hash)=> {
if(err){
     res.send({"error":err})
}else{
    const user = new UserModel({username,email,pass:hash})
    await user.save()
    res.status(200).send({
        msg: "New User Registered successfully",
    })
}
});

   } catch (error) {
    res.status(400).send({msg: error.message});
   }
  
})

// Authentication
userRouter.post('/login',async(req, res)=>{
    const{email,pass}=req.body
    
   try {
    
   const user= await UserModel.findOne({email})

   if(user){
    bcrypt.compare(pass,user.pass, (err, result) =>{
        if(result){
            // const token=jwt.sign({course:"fsd"},"secretKey",{
            //     expiresIn:"1h"
            // })
            const token=jwt.sign({userID:user._id,user:user.username},"secretKey",{
                expiresIn:"1h"
            })
            // here userID is taken not the note id because it is one to many realationship and a note can not exist without existance of a user
// so parent Id will be present inside the child Schema

            const refreshToken=jwt.sign({batch:"web24"},"secretKeyRefresh",{
                expiresIn:"7d"
            })


            res.status(200).send({"msg":"Login successful",token:token,refreshToken:refreshToken})
        }else{
            res.send({"error":err})
        }
    });

 
   } else{
    res.status(200).send({"msg":"wrong credentials"})
   }
  

   } catch (error) {
    res.status(400).send({"error":error});
   }
});

userRouter.get('/logout',(req,res)=>{
 const token = req.headers.authorization

 try {
    // blacklist.push(token)
    res.send( {"msg":"the used has been logged out successfully"})
 } catch (error) {
    res.send("error: " + error)
 }

})


module.exports ={
    userRouter
}
