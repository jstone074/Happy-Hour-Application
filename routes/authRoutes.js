const express = require("express");
const router = express.Router();
//const jwt = require("jsonwebtoken");
const passport = require("passport");

/* POST login. */

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

router.post("/login", function(req, res, next) {
  passport.authenticate("local", { session: true }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user
      });
    }
    req.login(user, { session: true }, err => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      //const token = jwt.sign(user, "your_jwt_secret");
      return res.json({ user, token });
    });
  })(req, res, next);
});

module.exports = router;
