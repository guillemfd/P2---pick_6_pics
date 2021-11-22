// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

//Other Variables
const app = express();
const cookieParser = require("cookie-parser");

// use session here:
require("./config/session.config")(app);

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config/")(app);

//Middleware para archivos estaticos
app.use(express.static(__dirname + "/public"));

//Middleware de hbs
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

//Middleware de body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// default value for title local
const projectName = "Pick 6 Pics";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created by Guillem using IronLauncher`;



// 👇 Start handling routes here
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/search", require("./routes/search.js"))
app.use("/UserFavs", require("./routes/favorites.js"))

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
