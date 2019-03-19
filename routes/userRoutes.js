var db = require("../models");

module.exports = function(app) {
  // GET Bars
  app.get("/api/bars", function(req, res) {
    db.Business.findAll({}).then(data => {
      console.log(data[0]);
      res.json(data);
    });
  });

  /* GET user profile. */
  // app.get("/profile", function(req, res, next) {
  //   res.send(req.user);
  // });
};
