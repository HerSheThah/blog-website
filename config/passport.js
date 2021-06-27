const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
// user
const user = require("../models/user");

module.exports = function(passport) {
  passport.use(new LocalStrategy({
    usernameField: "email"
  }, function(email, password, done) {
    user.findOne({
      email: email
    }, function(err, user) {
      // email not found
      if (!user) {
        return done(null, false, {
          message: "Email not found. Enter a valid email."
        })
      }
      // checking for password match
      bcrypt.compare(password, user.password, function(err, isCorrect) {
        if (err) throw err;
        if (isCorrect) {
          return done(null, user);
        }
        if (!isCorrect) {
          return done(null, false, {
            message: "Incorrect password"
          });
        }
      })
    })
  }))
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    user.findById(id, function(err, user) {
      done(err, user);
    });
  });
}
