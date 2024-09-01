const { Schema, default: mongoose } = require("mongoose");
const Habit = require("../models/Habits");

exports.makeHabit = async (req, res) => {
  const { habitName, habitDescription, categories } = req.body;

  const userID = req.user;

  try {
    const habit = new Habit({
      categories: categories,
      habitName: habitName,
      habitDescription: habitDescription,
      author: userID,
    });
    await habit.save();

    res
      .status(201)
      .json({ message: "Habit Created Successfully", data: habit });
  } catch (e) {
    res.status(501).json({ message: "Internal server error", error: e });
  }
};

exports.getHabits = async (req, res) => {
  const userID = req.user;
  console.log(userID);
  try {
    const habits = await Habit.find({
      author: userID,
    });
    if (habits.length === 0) {
      res.status(204).json({ message: "No habits where found" });
    } else {
      res.status(200).json({ message: "Habits found successfully", habits });
    }
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "internal server error", error: e });
  }
};
