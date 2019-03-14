var db = require("../models");

module.exports = function(app) {
  // Get all bars
  app.get("/api/bars", function(req, res) {
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // ----- IMPORTANT NOTE -----
  // We need to know how we're populating the bars and specials
  // Do we pull in from Business.name, Hours.today, Specials.today?
  // Do we make a new table to pull from?
  // How long does it take to make thosse three calls?
  // Should we look into caching?
  // It will be too slow to do this for each bar, most likely.

  // Update favourites
  app.put("/api/fav", function(req, res) {
    db.User.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};
