const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");

const { User } = require("../models/user.model");

const userDetailRouter = express.Router();
userDetailRouter.use(express.json());


userDetailRouter.get("/",async(req,res)=>{
    let id = req.headers.id;
    try{
        const user = await User.find({_id:id});
        res.status(201).send(user)

    }catch(err){
        res.send({"msg":err})
        console.log(err);
    }
})

userDetailRouter.patch("/",async(req,res)=>{
    const payload = req.body;
    try{
        const userDetail = await User.findByIdAndUpdate(req.headers.id, payload);
        console.log(userDetail);
        res.send({"msg":`user Details Updated `})
    }catch(err){
        console.log(err);
        res.send({"msg":"error while patching"})
    }
})

module.exports = {
    userDetailRouter
}