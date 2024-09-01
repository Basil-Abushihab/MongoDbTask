const express = require("express");
const router = express.Router();
const habitController = require("../controller/habitController");
const auth = require("../middleware/auth");
router.post("/makeHabit", auth, habitController.makeHabit);
router.get("/getHabits", auth, habitController.getHabits);

module.exports = router;
