const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (userID) => {
  console.log(userID);
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(userID, secret);
  return token;
};

module.exports = generateToken;
