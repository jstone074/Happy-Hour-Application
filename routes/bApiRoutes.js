var db = require("../models");

module.exports = function(app) {
  // Add business
  app.post("/api/business", (req, res) => {
    db.Business.create(req.body).then(dbBusiness => {
      res.json(dbBusiness);
    });
  });

  // Display business info
  app.get("/api/business/:id", (req, res) => {
    db.Business.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Hours]
    }).then(dbBusiness => {
      res.json(dbBusiness);
    });
  });

  // Update business info
  app.put("/api/business", (req, res) => {
    db.Business.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dbBusiness => {
      res.json(dbBusiness);
    });
  });

  // Delete an business by id
  app.delete("/api/business/:id", (req, res) => {
    db.Business.destroy({ where: { id: req.params.id } }).then(dbBusiness => {
      res.json(dbBusiness);
    });
  });

  // ----- HOURS -----

  // Add opening hours
  app.post("/api/hours", (req, res) => {
    db.Hours.create(req.body).then(dbHours => {
      res.json(dbHours);
    });
  });

  // Update hours
  app.put("/api/hours", (req, res) => {
    db.Hours.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dbHours => {
      res.json(dbHours);
    });
  });

  // ----- Specials -----

  // Add specials
  app.post("/api/specials", (req, res) => {
    db.Specials.create(req.body).then(dbHours => {
      res.json(dbHours);
    });
  });

  // Update specials
  app.put("/api/specials", (req, res) => {
    db.Specials.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dbSpecials => {
      res.body(dbSpecials);
    });
  });
};
