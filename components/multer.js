const multer = require('multer');
const express = require("express");

var storage = multer.diskStorage({
        destination: './public/uploads',
        filename: function (req, file, cb) {
            switch (file.mimetype) {
                case 'image/jpeg':
                    ext = '.jpeg';
                    break;
                case 'image/png':
                    ext = '.png';
                    break;
            }
            cb(null, file.originalname + ext);
        }
    });

var upload = multer({
  storage: storage
});

module.exports = upload;
