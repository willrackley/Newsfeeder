var express = require('express');
var db = require("../models");
var bcrypt = require('bcryptjs');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res) {
    db.User.find({}, function(err, data) {
        if (err) {
        console.log(err);
        }
        else {
        res.json(data);
        }
    });
});

router.post("/sign-up", function(req, res) {
    let {
		firstname,
		email,
		password,
		password2
    } = req.body;
	var messages = [];

    // If statement to check do we have 4 input values
	if (!firstname || !email || !password || !password2) {
		messages.push({
			msg: 'Please enter all fields',
			type: 'warning'
		});
	}
	// If statement to check does password matches confirm password field
	if (password !== password2) {
		messages.push({
			msg: 'Passwords do not match',
			type: 'warning'
		});
	}
	// If statemant to check passwords lenght
	if (password.length < 6) {
		messages.push({
			msg: 'Password must be at least 6 characters',
			type: 'warning'
		});
	}
	// If we have errors return them to form
	if (messages.length > 0) {
		return res.json(messages);
		// If we don't have errors continue
	} else {
		// Prepare form values for database
		firstname = firstname.toLowerCase();
		firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1);
		email = email.toLowerCase();
		// Hash users password
		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(password, salt);
		// function to find user by email
		// If user exist we respond with error msg
		// If user doesn't exist, create new record
        db.User.find({
            email: email
            },function (err, data) {
            if (data.length !== 0) {
                messages.push({
                    msg: 'User with this email already exists',
                    type: 'warning'
                });
                return res.json(messages);
            } else {
                db.User.create({
                    firstname: firstname,
                    email: email,
                    password: hash
                })
                .then(function(dbUser) {
                    messages.push({
                        msg: 'Account successfully created, you can login.',
                        type: 'success'
                    });
                    return res.json(messages);
                }) ; 
            }
        });
    }
  });

router.post('/login', function(req, res) {
    passport.authenticate('local', function(err, user, info) {
    
        req.logIn(user, function(err) {
            db.User.update({}, {
                loggedIn: true
            }).then(function(update) {
                return res.redirect('/app/main');
            });
        });
    })(req, res);
});
  

module.exports = router;