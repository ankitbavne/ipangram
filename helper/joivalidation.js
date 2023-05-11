const Joi = require("joi");
let response = require("./response");
let MESSAGE = require("../helper/appMessage");

module.exports = {
  registration: async (req, res, next) => {
    try {
      const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(8).max(20).required(),
        gender: Joi.string().required(),
        hobbies: Joi.array(),
        designation: Joi.string().required(),
      });
      const { error, value } = schema.validate(req.body);
      if (error) {
        return response.CustomError(
          res,
          400,
          MESSAGE.VALIDATION_ERROR,
          error.message
        );
      }
      next();
    } catch (error) {
      return response.conflictErrorMsgResponse(
        res,
        500,
        MESSAGE.SOMETHING_WENT_WRONG
      );
    }
  },

  login: async (req, res, next) => {
    try {
      const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      });
      const { error, value } = schema.validate(req.body);
      if (error) {
        return response.CustomError(
          res,
          400,
          MESSAGE.VALIDATION_ERROR,
          error.message
        );
      }
      next();
    } catch (error) {
      return response.conflictErrorMsgResponse(
        res,
        500,
        MESSAGE.SOMETHING_WENT_WRONG
      );
    }
  },

  addDepartmentValidator: async (req, res, next) => {
    try {
      const schema = Joi.object({
        departmentName: Joi.string(),
        categoryName: Joi.string(),
        location: Joi.string(),
        salary: Joi.string(),
        employeeID: Joi.string().required(),
      });
      const { error, value } = schema.validate(req.body);
      if (error) {
        return response.CustomError(
          res,
          400,
          MESSAGE.VALIDATION_ERROR,
          error.message
        );
      }
      next();
    } catch (error) {
      return response.conflictErrorMsgResponse(
        res,
        500,
        MESSAGE.SOMETHING_WENT_WRONG
      );
    }
  },

  updateDepartmentValidator: async (req, res, next) => {
    try {
      const schema = Joi.object({
        departmentName: Joi.string(),
        categoryName: Joi.string(),
        location: Joi.string(),
        salary: Joi.string(),
        employeeID: Joi.string().required(),
        id: Joi.string().required(),
      });
      const { error, value } = schema.validate(req.body);
      if (error) {
        return response.CustomError(
          res,
          400,
          MESSAGE.VALIDATION_ERROR,
          error.message
        );
      }
      next();
    } catch (error) {
      return response.conflictErrorMsgResponse(
        res,
        500,
        MESSAGE.SOMETHING_WENT_WRONG
      );
    }
  },

  deleteDepartmentValidator: async (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.string().required(),
      });
      const { error, value } = schema.validate(req.params);
      if (error) {
        return response.CustomError(
          res,
          400,
          MESSAGE.VALIDATION_ERROR,
          error.message
        );
      }
      next();
    } catch (error) {
      return response.conflictErrorMsgResponse(
        res,
        500,
        MESSAGE.SOMETHING_WENT_WRONG
      );
    }
  },
};
