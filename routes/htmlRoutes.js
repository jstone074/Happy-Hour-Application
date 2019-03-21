var db = require("../models");

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

  app.get("/api/business/");

  app.get("/api/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    } else {
      console.log("error in htmlRoutes, user not found or something");
    }
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page

  app.get("/members", isAuthenticated, function(req, res) {
    if (req.user.isBusiness) {
      db.Business.findOne({
        where: {
          UserId: req.user.id
        }
      }).then(dbBusiness => {
        return res.render("business_mngr", dbBusiness);
      });
    } else {
      res.render("user", { username: req.user.username });
    }
  });
};
