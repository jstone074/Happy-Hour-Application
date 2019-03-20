var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("./models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(
  new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
      usernameField: "email"
    },
    function(email, password, done) {
      // When a user tries to sign in this code runs
      db.User.findOne({
        where: {
          email: email
        }
      }).then(function(dbUser) {
        // If there's no user with the given email
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect email."
          });
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        // If none of the above, return the user
        return done(null, dbUser);
      });
    }
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
// passport.serializeUser(function(user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj);
// });

// Exporting our configured passport
module.exports = passport;

// const bcrypt = require("bcrypt");

// module.exports = function(passport, user) {
//     var User = user;
//     var LocalStrategy = require('passport-local').Strategy;
//     //console.log(req.body);

//     passport.use(
//       "passport-local",
//       new LocalStrategy(
//         {
//           usernameField: "email",
//           passwordField: "password",
//           passReqToCallback: true
//       },
//     function(req, email, password, done) {
//       //console.log(email, password);
//       User.findOne({ "local.email": email }, function(err, user) {
//         // if there are any errors, return the error
//         if (err) {
//             //return done(err);
//           res.json(err);
//             }

//         // check to see if theres already a user with that email
//         if (user) {
//             //return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
//             res.json({ err: "user exists" });
//         } else {
//             // if there is no user with that email
//             // create the user
//             const generateHash = function(password) {
//               return bcrypt.hasSync(password, bcrypt.genSaltSync(10), null);
//             };
//             const hashPassword = generateHash(password);
//             console.log("hashPassword" + hashPassword);
//           var newUser = {
//             email: email,
//             password: hashPassword,
//             name: "TestMango"
//           };

//           User.create(newUser).then((newData, created) => {
//             if (!newData) {
//               return done(null, false);
//             }
//             if (newData) {
//               return done(null, newData);
//             }
//           });
//         }
//       });
//     })
//     );
//   };

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
