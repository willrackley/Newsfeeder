var express = require('express');
var db = require("../models");
var router = express.Router();

router.get("/", function(req, res) {
    db.Article.find({}, function(err, data) {
        if (err) {
        console.log(err);
        }
        else {
        res.json(data);
        }
    });
});

module.exports = router;