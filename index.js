"use strict";
var express = require("express");
var path = require('path');
var bodyParser = require("body-parser");
var multer = require('multer');
var app = express();

// Custom filter for file uploads.
const customFileFilter = function(req, file, cb) {
    // accept only some common extensions
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/)) {
        return cb(new Error('This file type is not allowed!'), false);
    }
    cb(null, true);
};

var uploading = multer({
    dest: __dirname + '/public/uploads/',
    fileFilter: customFileFilter
})

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// start the application server.
var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("Image search listening on port", port);
});

/*****************************
 * Routes 
 *****************************/

// Route for index.
app.get('/', function(req, res) {
    res.render('index.html');
});

// Route for upload.
app.post('/fileUpload', uploading.single('upFile'), function(req, res) {
    console.log(req.file.size);
    res.json({
        size: req.file.size
    });
});