var express = require('express');
var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");
var router = express.Router();

router.get("/", function(req, res) {
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
          //console.log(result);
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
    
    });
  
      // Send a message to the client
      res.send("Scrape Complete");
    });
  });


module.exports = router;