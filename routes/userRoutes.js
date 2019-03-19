const db = require("../models");
// const express = require("express");
// const router = express.Router();

module.exports = function(app) {
  //display the username of the user currently logged in
  app.get("/api/me", (req, res) => {
    res.json(req.user.username);
  });
};
