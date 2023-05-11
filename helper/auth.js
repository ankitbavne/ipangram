const jwt = require("jsonwebtoken");
let config = require("../config.json");
module.exports = {
  verify: async (req, res, next) => {
    try {
      const header = req.headers.authorization;
      const token = header.split(" ")[1];
      const isVerified = jwt.verify(token, config.secretKey);
      if (isVerified) {
        req["userId"] = isVerified._id;
        next();
      } else {
        return res.status(401).json({
          message: "Unauthorized access.",
        });
      }
    } catch (error) {
      res.status(401).json({
        message: "Invalid Token",
      });
    }
  },
};
