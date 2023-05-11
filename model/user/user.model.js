const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const User = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    hobbies: { type: Array },
    email: { type: String },
    gender: { type: String, enum: ["M", "F", "O"] },
    password: { type: String },
    designation: { type: String, enum: ["MANAGER", "EMPLOYEE"] },
    status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", User);
