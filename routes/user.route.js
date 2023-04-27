const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')


const { User } = require("../models/user.model");

const userRouter = express.Router();
userRouter.use(express.json());

//====================for procution======================
userRouter.get("/",async(req,res)=>{
  const users = await User.find()
  res.send(users)
})
//===========================/////

userRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;
  let name = "ganesh dhonde";
  let img_url = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  let bio = "I am full stack web developer";
  let phone = 919132324;
  try {
    let all_data = await User.find({ email });
    if (all_data.length === 0) {
      bcrypt.hash(password, 5, async (err, val) => {
        if (err) {
          res.send({ msg: "please try later" });
        } else {
          const user = new User({ name, img_url,bio,phone,email, password: val });
          await user.save();
          res.send({ msg: "User Created Successfully" });
        }
      });
    } else {
      res.send({ msg: "User Already registered" });
    }
  } catch (error) {
    res.send({ msg: "Error in registering" });
    console.log(error);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email });
    const hashed_pass = user[0].password;
    if (user.length) {
      bcrypt.compare(password, hashed_pass, (err, result) => {
        console.log(result);
        if (result) {
          const token = jwt.sign({ Userid: user[0]._id }, process.env.SECRET);
          res.send({ msg: "Login Successfull", Access_Token: token });
        }
      });
    }else{
      res.send({"msg":"user does not exist"})
    }
  } catch (err) {}
});




module.exports = {
  userRouter,
};
