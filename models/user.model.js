const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  img_url:{type:String,required:true},
  bio:{type:String,required:true},
  phone:{type:Number,required:true},
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("user", userSchema);

module.exports = {
  User
};
