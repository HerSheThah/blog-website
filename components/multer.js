const multer = require('multer');
const express = require("express");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '.jpg');
  }
})
var upload = multer({
  storage: storage
});

module.exports = upload;
