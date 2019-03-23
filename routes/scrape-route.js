var express = require('express');
var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");
var router = express.Router();

router.get("/sports", function(req, res) {
  
    // First, we grab the body of the html with axios
    axios.get("https://www.nytimes.com/section/sports").then(function(response) {
     
      var $ = cheerio.load(response.data);
  
     
      $("div.css-13mho3u ol li ").each(function(i, element) {
        
        var result = {};

        result.title = $(element).find("a").children("h2")
          .text().trim();
        result.link =  'https://www.nytimes.com' + $(element).find("a")
          .attr("href");
        result.summary = $(element).find("a").children("p")
        .text().trim();
        result.category = "sports";
        result.user = req.user.firstname;
        
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
     
      $("div.item-list ul li article").each(function(i, element) {
        
        var eResult = {};
  
        eResult.title = $(element).find("h2").children("a")
          .text().trim();
        eResult.link = 'https://www.etonline.com' + $(element).find("h2").children("a")
          .attr("href");
        eResult.summary = $(element).find("div.field-subhead")
        .text().trim();
        eResult.category = "entertainment";
        eResult.user = req.user.firstname;
        
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

  router.get("/politics", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.politico.com/politics").then(function(response) {
     
      var $ = cheerio.load(response.data);
  
      $("div.content section article.headlines-latest ul li div.summary").each(function(i, element) {
        
        var pResult = {};
  
        pResult.title = $(element).find("h3").children("a")
          .text().trim();
        pResult.link = $(element).find("h3").children("a")
          .attr("href");
        pResult.summary = $(element).find("div.tease").children("p").text();
        pResult.category = "politics";
        pResult.user = req.user.firstname; 
        
        db.Article.find({
            title: pResult.title
        }, function(err, data) {
            // Log any errors if the server encounters one
            if (err) {
              console.log(err);
            }
            //checks to see if article is already in the database
            //if it isnt then we add it
            if (data.length === 0) {
                 //Create a new Article using the `result` object built from scraping
                 db.Article.create(pResult)
                 .then(function(dbArticle) {
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
      res.send("Politics Scrape Complete");
    });
  });



module.exports = router;