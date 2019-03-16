//var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    } else {
      res.render("index");
    }
  });

  app.get("/api/login", function(req, res) {
    // If the user already has an account send them to the members page
    console.log(req.user);
    console.log(req.body);
    if (req.user) {
      res.redirect("/members");
      // if (req.body.user.isBusiness) {
      // res.render("business_mngr");
      // } else {
      //   res.render("user");
      // }
    } else {
      console.log("error in htmlRoutes, user not found or something");
    }
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    console.log(req.user);
    if (req.user.isBusiness) {
      res.render("business_mngr");
    } else {
      res.render("user");
    }
  });
};

// module.exports = function(app) {
//   // Load index page
//   app.get("/", function(req, res) {
//     db.Example.findAll({}).then(function(dbExamples) {
//       res.render("index", {
//         msg: "Welcome!",
//         examples: dbExamples
//       });
//     });
//   });

//   // Load example page and pass in an example by id
//   app.get("/example/:id", function(req, res) {
//     db.Example.findOne({ where: { id: req.params.id } }).then(function(
//       dbExample
//     ) {
//       res.render("example", {
//         example: dbExample
//       });
//     });
//   });

//   // Render 404 page for any unmatched routes
//   app.get("*", function(req, res) {
//     res.render("404");
//   });
// };
