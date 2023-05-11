let mongoose = require("mongoose");
let connection = require("../helper/database");
let config = require("../config.json");
let User = require("../model/user/user.model");
const bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let MESSAGE = require("../helper/appMessage");
let response = require("../helper/response");

module.exports = {
  // EMPLOYEE AND MANAGER REGISTER
  register: async (req, res, next) => {
    try {
      let condition = {
        email: req.body.email,
      };

      const userData = await User.findOne(condition);
      if (userData) {
        return response.conflictErrorMsgResponse(
          res,
          500,
          MESSAGE.ALREADY_REGISTERED
        );
      } else {
        let data = req.body;
        bcrypt.genSalt(config.saltRounds, async function (err, salt) {
          bcrypt.hash(data.password, salt, async function (err, hash) {
            data["password"] = hash;
            let user = await new User(data).save();
            if (user) {
              return response.successResponse(
                res,
                200,
                MESSAGE.REGISTRATION_SUCCESSFUL,
                user
              );
            } else {
              return response.conflictErrorMsgResponse(
                res,
                500,
                MESSAGE.SOMETHING_WENT_WRONG
              );
            }
          });
        });
      }
    } catch (error) {
      return response.conflictErrorMsgResponse(
        res,
        500,
        MESSAGE.SOMETHING_WENT_WRONG
      );
    }
  },

  // EMPLOYEE AND MANAGER LOGIN
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      let obj = {
        email: email,
      };
      let getUser = await User.findOne(obj);
      if (!getUser) {
        return response.conflictErrorMsgResponse(
          res,
          404,
          MESSAGE.EMAIL_NOT_FOUND
        );
      } else {
        getUser = JSON.parse(JSON.stringify(getUser));
        let matchPasword = await bcrypt.compare(password, getUser.password);
        if (matchPasword) {
          let token = await jwt.sign(getUser, config.secretKey, {
            expiresIn: "24h",
          });
          getUser["token"] = `Bearer ${token}`;

          return response.successResponse(
            res,
            200,
            MESSAGE.LOGIN_SUCCESSFUL,
            getUser
          );
        } else {
          return response.conflictErrorMsgResponse(
            res,
            500,
            MESSAGE.SOMETHING_WENT_WRONG
          );
        }
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
