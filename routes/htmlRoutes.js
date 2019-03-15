var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Load example page and pass in an example by id
  app.get("/business", function(req, res) {
    res.render("business_mngr");
  });

  // Load example page and pass in an example by id
  app.get("/user", function(req, res) {
    res.render("user_main");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
