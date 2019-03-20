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
// 	passport.authenticate('local', function(err, user, info) {
//     if (err) {
//         return next(err);
//     }
//     if (!user) {
//         req.flash('error', info.message);
//         return res.redirect('/login');
//     }
//     req.logIn(user, function(err) {
//         if (err) {
//             return next(err);
//         } else {
//             return res.redirect('/app/main');
//         }
//     });
//     (req, res, next);
// });

    passport.authenticate('local', { successRedirect: '/app/main',
        failureRedirect: '/app/login',
        failureFlash: true 
    })

); 



router.get('/logout', function(req, res) {
	req.logout();
	req.flash('success_msg', 'You are successfully logged out');
	res.redirect('/app/login');
});

passport.serializeUser(function(user, done) {
    done(null, user.id);
    console.log(user)
});

passport.deserializeUser(function(id, done) {
        done(null, id)
    
});


module.exports = router;