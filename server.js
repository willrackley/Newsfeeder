var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

// Initialize Express
var app = express();

var PORT = process.env.PORT || 3000;

// Require all models
var db = require("./models");

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/Newsfeeder";
mongoose.connect(MONGODB_URI);


// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express Sessions
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Setting up flash messages
app.use(flash());

// Global variables
app.use(function(req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
	});
	
// Setting up templates 
app.set('view engine', 'ejs');

// Passport config
require('./config/passport')(passport);

// Make public a static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/app/scrape', require('./routes/scrape-route'));
app.use('/app/articles', require('./routes/article-route'));
app.use('/app/users', require('./routes/users-route'));
app.use('/app/comments', require('./routes/comment-route'));
app.use('/', require('./routes/html-routes'));


// Start the server
app.listen(PORT, function() {
    console.log("Newfeeder App running on port " + PORT + "!");
});
  