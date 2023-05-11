let express = require("express");
let path = require("path");
let fs = require("fs");
let database = require("./helper/database");
let config = require("./config.json");
var bodyParser = require("body-parser");
let cors = require("cors");
let cookieParser = require("cookie-parser");

database.initModels();
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));

enableCORS(app);
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
database.connect();
global.globalString = "This can be accessed anywhere!++++++++++++++";

function enableCORS(expressInstance) {
  expressInstance.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, timeZone"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS, PATCH"
    );
    next();
  });
}

function enableStaticFileServer(expressInstance, folderName, route) {
  app.use(route, express.static(path.join(__dirname, folderName)));
}

enableStaticFileServer(app, config.uploadUrl, "/");
require("./routes/index.routes")(app);

app.listen(config.server.port, () => {
  console.log("App listening on port : ", config.server.port);
});
