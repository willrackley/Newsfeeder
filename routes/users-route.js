var express = require('express');
var db = require("../models");
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

router.post("/added", function(req, res) {
    var user = req.body;
    var messages = [];

    db.User.find({
        email: user.email
    }, function(err, data) {
        // Log any errors if the server encounters one
        if (err) {
          console.log(err);
        }
        //checks to see if article is already in the database
        //if it isnt then we add it
        if (data.length === 0) {
             //Create a new Article using the `result` object built from scraping
             db.User.create(user)
            .then(function(dbUser) {
                // If saved successfully, send the the new User document to the client
                //redirect to login
               res.json(dbUser);
               res.end();
            })
            .catch(function(err) {
                // If an error occurs, send the error to the client
                res.json(err);
            });
        }
        //if the scraped article is in the database then we end the res
        if (data.length !== 0) {
           
            messages.push('That email is already in use');
            return res.json(messages);
        }
    });
  });

  router.post('/login', function(req, res) {
    var user = req.body;

    console.log(user)

    db.User.find({
        email: user.email,
        password: user.password
    }, function(err, data) {
        // Log any errors if the server encounters one
        if (err) {
          console.log(err);
        }
        //if the scraped article is in the database then we end the res
        if (data.length !== 0) {
            res.redirect('/app/main');
            
        }
        if (data.length === 0) {
            res.redirect('/app/login');
        }
    });

  });
  

module.exports = router;