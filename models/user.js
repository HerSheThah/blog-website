const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate');

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
  },
  email:{
    type:String,
  },
  password:{
    type:String,
  },
  date:{
    type:Date,
    default:Date.now
  },
  googleId:String,
  facebookId:String,
  posts: [
    {
      title: String,
      description: String,
      date: String,
      image: String
    }
  ]

});

UserSchema.plugin(findOrCreate);

const User = mongoose.model("user", UserSchema);

module.exports = User;
