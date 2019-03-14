require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
require("./passport");
var passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var session = require("express-session");
var bodyParser = require("body-parser");


var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;
const auth = require("./routes/authRoutes");
const user = require("./routes/userRoutes");

// Middleware
app.use("/authRoutes", auth);
// For Passport
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use("/userRoutes", passport.authenticate("jwt", { session: false }), user);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);

//load passport strategies
require("./passport")(passport, models.user);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------

db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
