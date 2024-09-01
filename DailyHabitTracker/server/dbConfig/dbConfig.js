//DB config imports
const mongoose = require("mongoose");
require("dotenv").config();

// Config Variables
URL = process.env.CLUSTER_URL;

// DB connection
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("connection successfull");
});

module.exports = mongoose;
