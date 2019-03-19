var express = require('express');
var db = require("../models");
var path = require('path');
var router = express.Router();

router.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get('/main', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));
});

module.exports = router;