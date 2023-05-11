const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Department = new Schema(
  {
    departmentName: { type: String },
    categoryName: {
      type: String,
      enum: ["HR", "IT", "SALES", "PRODUCT", "MARKETING"],
    },
    employeeID: { type: mongoose.Types.ObjectId, ref: "User" },
    salary: { type: Number },
    status: { type: String, enum: ["Active", "Inactive"] },
    location: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Department", Department);
