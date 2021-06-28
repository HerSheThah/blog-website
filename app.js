//===================================== modules====================================
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const app = express();
const _ = require('lodash');
const mongoose = require('mongoose');
const request = require('request');
// mailchimp for mail and data storing
const mailchimp = require('@mailchimp/mailchimp_marketing');
const https = require('https');
// custom functions export package
const custom_functions = require(__dirname + "/custom_functions.js");
const expressLayouts = require("express-ejs-layouts");
// ensure authenticate
const {
  ensureAuth
} = require("./config/auth");

// ----------------OAuth--------------------
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
// Multer for file storage
const upload = require("./components/multer");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
// passport setup
require("./config/passport")(passport);
// database
const db = require("./config/keys").blogdbURI;
// connecting to database
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(function() {
    console.log("Connected to the database")
  })
  .catch(function(err) {
    console.log(err);
  });
// user model
const user = require("./models/user");
// ==========================================basic setups==========================================
// using ejs files in views
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(bodyParser.urlencoded({
  extended: true
}));

// public files usage
app.use(express.static('public'));

// session
app.use(session({
  secret: 'thisisasecret',
  resave: false,
  saveUninitialized: true,
}))

// passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Flash for pop ups
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
})

// Routes
app.use("/user", require("./routes/user"));

// ===================================================google strategy===================================================
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://peaceful-mountain-44087.herokuapp.com/auth/google/home"
  },
  function(accessToken, refreshToken, profile, cb) {
    user.findOrCreate({
      googleId: profile.id
    }, function(err, user) {
      return cb(err, user);
    });
  }
));
// google Login
app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile']
  }));

app.get('/auth/google/home',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home');
  });

// ===================================================facebook strategy===================================================
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "https://peaceful-mountain-44087.herokuapp.com/auth/facebook/home"
  },
  function(accessToken, refreshToken, profile, cb) {
    user.findOrCreate({
      facebookId: profile.id
    }, function(err, user) {
      return cb(err, user);
    });
  }
));
// facebook Login
app.get('/auth/facebook',
  passport.authenticate('facebook', {
    scope: ['public_profile']
  }));

app.get('/auth/facebook/home',
  passport.authenticate('facebook', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home');
  });
// ===================================================root route===================================================
app.get("/", function(req, res) {
  if (typeof req.user != 'undefined') {
    res.render("home", {
      blog_steps: custom_functions.getblogsteps(),
      allPosts: req.user.posts
    });
  } else {
    res.render("welcome");
  }
})
// ===================================================home route===================================================
app.get("/home", ensureAuth, function(req, res) {
  res.render("home", {
    blog_steps: custom_functions.getblogsteps()
  });
})
// ==========================================blogs route==========================================
app.get("/blogs", ensureAuth, function(req, res) {
  res.render("blogs", {
    allPosts: req.user.posts
  })
})
// ====================================compose route========================================
app.get("/compose", ensureAuth, function(req, res) {
  res.render("compose", {
    imageslist: custom_functions.getimages()
  })
})
app.post("/compose", upload.single('photo'), function(req, res) {
  var img_path;
  if (req.file != null) {
    // user file
    img_path = '/uploads/' + req.file.filename;
  } else if (req.body.img_selected != null) {
    // choosen file
    img_path = req.body.img_selected;
  } else {
    // random image file
    var images = custom_functions.getimages();
    var img_length = images.length;
    var index = (Math.floor(Math.random() * img_length));
    img_path = images[index];
  }
  var userpost = {
    title: _.capitalize(req.body.title),
    description: _.capitalize(req.body.comment),
    date: custom_functions.getdate(),
    image: img_path
  }
  user.findByIdAndUpdate(req.user._id, {
      $push: {
        posts: userpost
      }
    }, {
      safe: true,
      upsert: true
    },
    function(err, model) {
      if (!err) {
        res.redirect("/blogs");
      }
    }
  )
})
// ==========================================contact route==========================================
app.get("/contact", ensureAuth, function(req, res) {
  res.render("contact")
})
app.post("/contact", function(req, res) {
  var name = req.body.firstName;
  var message = req.body.message;
  var email = req.body.email;
  // =================================mail chimp usage=======================================
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_APIKEY,
    server: "us1",
  });
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: name,
        LNAME: message
      }
    }],
  };
  async function run() {
    const response = await mailchimp.lists.batchListMembers(process.env.MAILCHIMP_BENCHID, data)
    console.log(response.errors.error)
    if (response.error_count == 0) {
      res.render("success");
    } else {
      res.render("failure");
    }
  };
  run();
})
// ====================================feedback for contact=========================================
app.post("/failure", function(req, res) {
  res.redirect("/contact")
})
app.post("/success", function(req, res) {
  res.redirect("/")
})
// ====================================posts route========================================
app.get("/posts/:postId", ensureAuth, function(req, res) {
  const foundPost = _.find(req.user.posts, {
    id: req.params.postId
  });
  if (foundPost) {
    res.render("post", {
      title: foundPost.title,
      content: foundPost.description,
      bg_image: foundPost.image,
      postid: foundPost._id,
      date: foundPost.date
    })
  } else {
    console.log("didn't find");
  }
})

// ====================================delete post route========================================
app.post("/deletepost", function(req, res) {
  const post_id = req.body.delete_post;
  user.findByIdAndUpdate(req.user._id, {
    $pull: {
      "posts": {
        _id: post_id
      }
    }
  }, function(err, model) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/blogs");
    }
  })
})
// ====================================edit blog route========================================
app.get("/edit/:postId", ensureAuth, function(req, res) {
  var postId = req.params.postId;
  // find the post and render in edit page
  const foundPost = _.find(req.user.posts, {
    id: postId
  });
  if (foundPost) {
    res.render("edit", {
      id: postId,
      title: foundPost.title,
      desc: foundPost.description
    })
  }
});

app.post("/edit/:postId", function(req, res) {
  const toedittitle = _.capitalize(req.body.toeditTitle);
  const toeditbody = _.capitalize(req.body.toeditBody);
  const postid = req.body.postid;

  user.updateOne({
    'posts._id': postid
  }, {
    '$set': {
      'posts.$.title': toedittitle,
      'posts.$.description': toeditbody,
      'posts.$.date': custom_functions.getdate()
    }
  }, function(err, something) {
    if (!err) {
      res.redirect("/posts/" + postid);
    }
  })
});
// listen to port locally and globally
app.listen(process.env.PORT || 3000, function() {
  console.log("port 3000 is working!")
})
