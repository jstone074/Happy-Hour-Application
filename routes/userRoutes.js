const express = require("express");
const router = express.Router();
var db = require("../models");

module.exports = function(app) {
  // GET Bars
  app.get("/api/bars", function(req, res) {
    db.Business.findAll({}).then(data => {
      console.log(data[0].dataValues);
      res.json(data);
    });
  });

  /* GET user profile. */
  router.get("/profile", function(req, res, next) {
    res.send(req.user);
  });
};
