var express = require('express');
var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");
var router = express.Router();

router.get("/sports", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.cbssports.com/").then(function(response) {
     
      var $ = cheerio.load(response.data);
  
     
      $("div.top-marquee-side ul li a").each(function(i, element) {
        
        var result = {};
  
        result.title = $(this)
          .children("h3")
          .text().trim();
        result.link = 'https://www.cbssports.com/' + $(this)
          .attr("href");
        result.category = "sports"
          
        //console.log(result);
        
        db.Article.find({
            title: result.title
        }, function(err, data) {
            // Log any errors if the server encounters one
            if (err) {
              console.log(err);
            }
            //checks to see if article is already in the database
            //if it isnt then we add it
            if (data.length === 0) {
                 //Create a new Article using the `result` object built from scraping
                 db.Article.create(result)
                 .then(function(dbArticle) {
                   // View the added result in the console
                   console.log(dbArticle);
                 })
                 .catch(function(err) {
                   // If an error occurred, log it
                   console.log(err);
                 }); 
            }
            //if the scraped article is in the database then we end the res
            if (data.length !== 0) {
                res.end();
            }
        });
    });
      // Send a message to the client
      res.send("Sports Scrape Complete");
    });
  });

  router.get("/entertainment", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.etonline.com/news").then(function(response) {
     
      var $ = cheerio.load(response.data);
  
     
      $("div.item-list ul li article h2 a").each(function(i, element) {
        
        var eResult = {};
  
        eResult.title = $(this)
          .text().trim();
        eResult.link = 'https://www.etonline.com' + $(this)
          .attr("href");
        eResult.category = "entertainment" 
       console.log(eResult);
        
        db.Article.find({
            title: eResult.title
        }, function(err, data) {
            // Log any errors if the server encounters one
            if (err) {
              console.log(err);
            }
            //checks to see if article is already in the database
            //if it isnt then we add it
            if (data.length === 0) {
                 //Create a new Article using the `result` object built from scraping
                 db.Article.create(eResult)
                 .then(function(dbArticle) {
                   // View the added result in the console
                   console.log(dbArticle);
                 })
                 .catch(function(err) {
                   // If an error occurred, log it
                   console.log(err);
                 }); 
            }
            //if the scraped article is in the database then we end the res
            if (data.length !== 0) {
                res.end();
            }
        });
     });
      // Send a message to the client
      res.send("Entertainment Scrape Complete");
    });
  });



module.exports = router;