const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {UserModel}=require("../model/user.model");
const userRoute = express.Router()

// register

userRoute.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married} = req.body;
   try {
     const isEmail = await UserModel.findOne({email});
     if(isEmail){
        res.status(400).send({msg:"user is already present"});
     }
     const hashed = await bcrypt.hash(password,5);
     const user = new UserModel({name,email,gender,password,hashed,age,city,is_married});
     await user.save()
     res.status(200).send({"msg":"sucessfully registered"})
   } catch (error) {
    res.status(400).send({msg:"Something went wrong"})
   }
})

// login
userRoute.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    res.status(200).send({
                        "msg":"login success",
                        token:jwt.sign({
                            "userID":user._id},
                            "masai",{expiresIn:"1h"
                        })
                    })
                }else{
                    res.status(400).send({"msg":"wrong credentials"});
                }
            })
        }else{
            res.status(400).send({msg: "user not found"});
        }

    } catch (error) {
        
    }
})


module.exports={
    userRoute
}

