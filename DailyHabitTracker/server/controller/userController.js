const User = require("../models/user");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

exports.registerUser = async (req, res) => {
  const userData = req.body;

  try {
    userData.password = bcrypt.hashSync(userData.password, 10);
    console.log("hello");
    const user = new User({ ...userData, _id: new mongoose.Types.ObjectId() });
    await user.save();
    const token = generateToken(user._id.toString());
    const options = {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };
    res.cookie("token", token, options);
    res
      .status(201)
      .json({ message: "user was created successfully", user: user });
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal server error", error: e });
  }
};

exports.loginUser = async (req, res) => {
  const userData = req.body;
  try {
    const user = await User.findOne(
      { email: userData.email },
      "email password"
    );
    if (!bcrypt.compare(userData.password, user.password)) {
      res.status(401).json({
        message: "Unauthorized user,invalid credentials",
      });
    } else {
      const token = generateToken(user._id.toString());
      const options = {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };
      res.cookie("token", token, options);
      res
        .status(201)
        .json({ message: "user logged in successfully", user: user });
    }
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal server error", error: e });
  }
};
