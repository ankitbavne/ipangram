module.exports = (app) => {
  let userRoute = require("./user/user.routes");
  let departmentRoute = require("./department/department.routes");

  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/department", departmentRoute);
};
