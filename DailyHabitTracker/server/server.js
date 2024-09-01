// server imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoute");
const habitRoutes = require("./routes/habitRoutes");
require("dotenv").config();

//configuration variables

const port = process.env.PORT || 3001;
const corsConfig = {
  origin: "https://localhost:5173",
  credentials: true,
};
// server initiallization
const app = express();

// middleware initialization

app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(cookieParser());

//Routes defenition
app.use("/api/users", userRoutes);
app.use("/api/habits", habitRoutes);
// server start
app.listen(port, () => {
  try {
    console.log(`server running on http://localhost:${port}/`);
  } catch (e) {
    console.log(`error running server: ${e}`);
  }
});
