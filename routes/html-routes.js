var express = require('express');
var db = require("../models");
var path = require('path');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
const {isLogged } = require('../config/auth');
var router = express.Router();

router.get('/', isLogged, (req, res) => {
});

router.get('/app', isLogged, (req, res) => {
    // This route is secured, used only to redirect user. (isLogged)
});

router.get('/login', function(req, res) {
    res.render('pages/login');
});

router.get('/main', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));
});

router.post('/login', 
    passport.authenticate('local', { successRedirect: '/app/main',
    failureRedirect: '/app/login',
    failureFlash: true })

);

router.get('/logout', function(req, res) {
	req.logout();
	req.flash('success_msg', 'You are successfully logged out');
	res.redirect('/app/login');
});

module.exports = router;