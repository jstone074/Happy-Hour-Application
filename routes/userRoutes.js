const express = require("express");
const router = express.Router();
var db = require("../models");

module.exports = function(app) {
  // GET Bars
  app.get("/api/bars", function(req, res) {
    db.User.findAll({
      where: {
        isBusiness: true
      }
    }).then(data => {
      // console.log(data[0].dataValues);
      // res.json(data);
      for (let i = 0; i < data[0].dataValues.length; i++) {
        db.Business.findOne({
          where: {
            id: 
          }
        })
      }
    });
  });

  /* GET user profile. */
  router.get("/profile", function(req, res, next) {
    res.send(req.user);
  });
};
