let mongoose = require("mongoose");
let connection = require("../helper/database");
let config = require("../config.json");
const bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let Department = require("../model/department/department.model");
let MESSAGE = require("../helper/appMessage");
let response = require("../helper/response");

module.exports = {
  // CREATE DEPARTMENT
  createDepartment: async (req, res) => {
    try {
      const department = await new Department(req.body).save();
      return response.successResponse(
        res,
        200,
        MESSAGE.ADD_DEPARTMENT_SUCCESSFULLY,
        department
      );
    } catch (error) {
      return response.conflictErrorMsgResponse(
        res,
        500,
        MESSAGE.SOMETHING_WENT_WRONG
      );
    }
  },

  // GET ALL DEPARTMENT
  getDepartment: async (req, res) => {
    try {
      const { page, limit } = req.query;
      let skip = (page - 1) * limit;
      const getDepartment = await Department.find({})
        .limit(limit * 1)
        .skip(skip);
      if (getDepartment) {
        return response.successResponse(
          res,
          200,
          MESSAGE.GET_DEPARTMENT_SUCCESSFULLY,
          getDepartment
        );
      } else {
        return response.conflictErrorMsgResponse(
          res,
          500,
          MESSAGE.SOMETHING_WENT_WRONG
        );
      }
    } catch (error) {
      return response.conflictErrorMsgResponse(
        res,
        500,
        MESSAGE.SOMETHING_WENT_WRONG
      );
    }
  },

  // UPDATE DEPARTMENT
  updateDepartment: async (req, res) => {
    try {
      const user = req.user;
      const { id, departmentName, categoryName, location, salary, employeeID } =
        req.body;
      const condition = {
        departmentName: departmentName,
        categoryName: categoryName,
        location: location,
        salary: salary,
        employeeID: employeeID,
      };
      const updateDepartment = await Department.findOneAndUpdate(
        { _id: id },
        { $set: condition },
        { new: true }
      );
      if (updateDepartment) {
        const getDepartment = await Department.findOne(updateDepartment._id);
        return response.successResponse(
          res,
          200,
          MESSAGE.DEPARTMENT_UPDATED_SUCCESSFULLY,
          getDepartment
        );
      } else {
        return response.conflictErrorMsgResponse(
          res,
          500,
          MESSAGE.SOMETHING_WENT_WRONG
        );
      }
    } catch (error) {
      return response.conflictErrorMsgResponse(
        res,
        500,
        MESSAGE.SOMETHING_WENT_WRONG
      );
    }
  },

  // DELETE DEPARTMENT
  deleteDepartment: async (req, res) => {
    try {
      const id = req.params.id;
      const deleteDepartment = await Department.findOneAndDelete({ _id: id });
      if (deleteDepartment) {
        return response.successResponse(
          res,
          200,
          MESSAGE.DEPARTMENT_DELETED_SUCCESSFULLY,
          {}
        );
      } else {
        return response.conflictErrorMsgResponse(
          res,
          500,
          MESSAGE.SOMETHING_WENT_WRONG
        );
      }
    } catch (error) {
      return response.conflictErrorMsgResponse(
        res,
        500,
        MESSAGE.SOMETHING_WENT_WRONG
      );
    }
  },

  // GET EMPLOYEE BY CATEGORY NAME
  getEmpByCategoryId: async (req, res) => {
    try {
      let { location, categoryName, page, limit } = req.query;
      let skip = (page - 1) * limit;
      const result = await Department.find({
        categoryName: categoryName,
      })
        .populate("employeeID")
        .limit(limit * 1)
        .skip(skip);

      if (result) {
        return response.successResponse(
          res,
          200,
          MESSAGE.GET_EMPLOYEE_SUCCESSFULLY,
          result
        );
      } else {
        return response.conflictErrorMsgResponse(
          res,
          500,
          MESSAGE.SOMETHING_WENT_WRONG
        );
      }
    } catch (error) {
      return response.conflictErrorMsgResponse(
        res,
        500,
        MESSAGE.SOMETHING_WENT_WRONG
      );
    }
  },
};
