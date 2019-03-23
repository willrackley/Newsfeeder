# Newsfeeder

Newsfeeder is a web application that allows users to view articles from several different news outlets. Users are also able to leave comments on articles.

![Home Page](/public/images/newsfeeder.png)

## How it works 

* When A user signs up to join the application, their information, firstname, email, and password,is stored in a Mongo database. 

* Once logged in, the user has the option to select one of five categories: Get Articles, All Articles, Sports,  Entertainment, and Politics.

* If `Get Articles` is selected, the app scrapes articles from The NY Times, Entertainment Tonight, and Politico and then stores them into a collection in the Mongo database. The Articles are only added into the database once. clicking `Get Articles` only adds articles that are not already in the database.

* selecting `All Articles` lists all of the articles that are already in the database.

* selecting `Sports` lists all articles that are about sports.

* selecting `Entertainment` lists all articles that are about Entertainment.

* A user can click on the heading of the article to visit the full article.

* A user can comment on any article they choose. Each comment is stored in the Mongo database and is associated with each user and article. 

* A user can also delete comments, which removes the comment from the database.

## visit the site here
https://shrouded-river-39627.herokuapp.com/
