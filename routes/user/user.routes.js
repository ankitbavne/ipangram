var express = require("express");
var router = express.Router();
const controller = require("../../controller/user");
const validator = require("../../helper/joivalidation");

router.post("/register", validator.registration, controller.register);
router.post("/login", validator.login, controller.login);

module.exports = router;
