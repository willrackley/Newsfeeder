var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require('path');
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static(path.join(__dirname, 'public')));

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes
app.use('/app/scrape', require('./routes/scrape-route'));
app.use('/app/articles', require('./routes/article-route'));



// Start the server
app.listen(PORT, function() {
    console.log("Newfeeder App running on port " + PORT + "!");
});
  