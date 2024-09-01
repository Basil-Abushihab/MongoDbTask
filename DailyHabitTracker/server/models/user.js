// import mongooses schema and model constructors
const { Model } = require("mongoose");
const { Schema, model } = require("../dbConfig/dbConfig");

//defining user Schema
const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

//defining user model
const User = new model("User", userSchema);

module.exports = User;
