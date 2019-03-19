const express = require("express");
const router = express.Router();
const db = require("../models");

module.exports = function(app) {
  app.get("api/user/:id", (req, res) => {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(dbUser => {
      res.json(dbUser);
    });
  });
};
