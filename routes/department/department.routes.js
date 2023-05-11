var express = require("express");
var router = express.Router();
const controller = require("../../controller/department");
const validator = require("../../helper/joivalidation");
const auth = require("../../helper/auth");

router.post(
  "/createDepartment",
  auth.verify,
  validator.addDepartmentValidator,
  controller.createDepartment
);
router.get("/getAllDepartment", auth.verify, controller.getDepartment);
router.put(
  "/updateDepartment",
  auth.verify,
  validator.updateDepartmentValidator,
  controller.updateDepartment
);
router.delete(
  "/deleteDepartment/:id",
  auth.verify,
  validator.deleteDepartmentValidator,
  controller.deleteDepartment
);

router.get("/getEmpByCategoryId", auth.verify, controller.getEmpByCategoryId);

module.exports = router;
