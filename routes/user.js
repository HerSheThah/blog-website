const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const saltRounds = 10;

router.get("/login", function(req, res){res.render("login")});
router.get("/register", function(req, res){res.render("register")});

// User
const user = require("../models/user");

router.post("/register", (req, res) => {
  const {
    name,
    email,
    password,
    password2
  } = req.body;
  let errors = [];

  // check required field
  if (!name || !email || !password || !password2) {
    errors.push("All fields are required!");
  }
  // check password match
  if (password !== password2) {
    errors.push("Passwords doesn't match");
  }
  //check password length
  if (password.length < 6) {
    errors.push("Password should be atleast 6 character in length");
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    user.findOne({
      email: email
    }, function(err, foundUser) {
      if (foundUser) {
        // user exists
        errors.push("Email already exists");
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = user({
          name,
          email,
          password
        })
        bcrypt.genSalt(saltRounds, function(err, salt) {
          bcrypt.hash(password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(function(err, user) {
              if (user) {
                // req.flash("success_msg", "Successfully registered. Login to continue")
                // res.redirect("/user/login");
                res.render("login", {success_msg:"Successfully registered. Login to continue"})
              }
            });
          })
        });
      }
    })
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: '/home',
    failureRedirect: '/user/login',
    failureFlash: true
  })(req, res, next)
});


router.get("/logout", function(req, res){
  req.logout();
  req.flash("success_msg", "Successfully logged out. Log in to continue");
  res.redirect("/user/login")
});

module.exports = router;
