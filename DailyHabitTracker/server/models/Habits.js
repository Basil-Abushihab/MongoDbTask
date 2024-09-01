// import mongooses schema and model constructors
const { Schema, model } = require("../dbConfig/dbConfig");

//Initialize model schema

const habitSchema = new Schema({
  habitName: String,
  habitProgress: { type: String, default: "Pending" },
  habitDescription: String,
  categories: [{ tag: String }],
  isDeleted: { type: Boolean, default: false },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

// exporting the habit Model

const Habit = model("Habit", habitSchema);

module.exports = Habit;
