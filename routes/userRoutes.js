var db = require("../models");

module.exports = function(app) {
  // GET Bars
  app.get("/api/bars", function(req, res) {
    db.Business.findAll({}).then(data => {
      res.json(data);
    });
  });

  //display the username of the user currently logged in
  app.get("/api/me", (req, res) => {
    res.json(req.user.username);
  });
};
