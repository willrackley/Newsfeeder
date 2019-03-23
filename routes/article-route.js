var express = require('express');
var db = require("../models");
var router = express.Router();

//getting all articles in the database
router.get("/", function(req, res) {
    db.Article.find().sort({ "title": 1 }).exec(function(error, data) {
        // Log any errors if the server encounters one
        if (error) {
          console.log(error);
        }
        // Otherwise, send the result of this query to the browser
        else {
          res.json(data);
        }
      });
});

//getting all the entertainment articles
router.get('/top-entertainment', function(req, res) {
    db.Article.findOne({
        "category": "entertainment"
    }, function(err, data) {
        if (err) {
        console.log(err);
        }
        else {
        res.json(data);
        }
    });
});

//getting all sports articles
router.get('/top-sports', function(req, res) {
    db.Article.findOne({
        "category": "sports"
    }, function(err, data) {
        if (err) {
        console.log(err);
        }
        else {
        res.json(data);
        }
    });
});

//getting all politic articles
router.get('/top-politics', function(req, res) {
    db.Article.findOne({
        "category": "politics"
    }, function(err, data) {
        if (err) {
        console.log(err);
        }
        else {
        res.json(data);
        }
    });
});

module.exports = router;