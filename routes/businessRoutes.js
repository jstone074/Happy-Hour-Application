/* eslint-disable camelcase */
var db = require("../models");

module.exports = function(app) {
  // Add New info to business table
  app.post("/api/business", (req, res) => {
    console.log("Business Routes Body " + req.body);
    db.Business.create({
      business_name: req.body.businessName,
      business_phone: req.body.businessPhone,
      business_address: req.body.businessAddress,
      UserId: req.user.id
    }).then(dbBusiness => {
      res.json(dbBusiness);
    });
  });

  app.get("/api/specials", (req, res) => {
    db.Specials.findAll({}).then(data => {});
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
  app.post("/api/hours", (req, res ) => {
    console.log("Hours Routes Body " + req.body);
    db.Hour.create({
      sunday: req.body.businessSundayHours,
      monday: req.body.businessMondayHours,
      tuesday: req.body.businessTuesdayHours,
      wednesday: req.body.businessWednesdayHours,
      thursday: req.body.businessThrusdayHours,
      friday: req.body.businessFridayHours,
      saturday: req.body.businessSaturdayHours
    }).then(dbHours => {
      console.log("this is my hours ID////////");
      console.log(dbHours.id);
      res.json(dbHours);
    });
  });

  // Update hours
  app.put("/api/hours", (req, res) => {
    db.Hour.update(req.body, {
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
    console.log("Hours Routes Body " + req.body);
    db.Special.create({
      sunday: req.body.businessSundayHours,
      monday: req.body.businessMondayHours,
      tuesday: req.body.businessTuesdayHours,
      wednesday: req.body.businessWednesdayHours,
      thursday: req.body.businessThrusdayHours,
      friday: req.body.businessFridayHours,
      saturday: req.body.businessSaturdayHours
    }).then(dbSpecials => {
      res.json(dbSpecials);
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
