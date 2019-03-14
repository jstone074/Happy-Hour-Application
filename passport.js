const bcrypt = require("bcrypt");

module.exports = function(passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;
    //console.log(req.body);
  
    passport.use(
      "passport-local",
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password",
          passReqToCallback: true
      },
    function(req, email, password, done) {
      //console.log(email, password);
      User.findOne({ "local.email": email }, function(err, user) {
        // if there are any errors, return the error
        if (err) {
            //return done(err);
          res.json(err);
            }
  
        // check to see if theres already a user with that email
        if (user) {
            //return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            res.json({ err: "user exists" });
        } else {
            // if there is no user with that email
            // create the user
            const generateHash = function(password) {
              return bcrypt.hasSync(password, bcrypt.genSaltSync(10), null);
            };
            const hashPassword = generateHash(password);
            console.log("hashPassword" + hashPassword);
          var newUser = {
            email: email, 
            password: hashPassword,
            name: "TestMango"
          };
        
  
          User.create(newUser).then((newData, created) => {
            if (!newData) {
              return done(null, false);
            }
            if (newData) {
              return done(null, newData);
            }
          });
        }
      });
    })
    );
  };


// const passport = require("passport");
// const passportJWT = require("passport-jwt");
// const JWTStrategy = passportJWT.Strategy;
// const ExtractJWT = passportJWT.ExtractJwt;

// const LocalStrategy = require("passport-local").Strategy;
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password"
//     },
//     function(email, password, cb) {
//       //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
//       return User.findOne({ email, password })
//         .then(user => {
//           if (!user) {
//             return cb(null, false, { message: "Incorrect email or password." });
//           }
//           return cb(null, user, { message: "Logged In Successfully" });
//         })
//         .catch(err => cb(err));
//     }
//   )
// );

// passport.use(
//   new JWTStrategy(
//     {
//       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//       secretOrKey: "your_jwt_secret"
//     },
//     function(jwtPayload, cb) {
//       //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
//       return UserModel.findOneById(jwtPayload.id)
//         .then(user => {
//           return cb(null, user);
//         })
//         .catch(err => {
//           return cb(err);
//         });
//     }
//   )
// );

// module.exports = passport;
