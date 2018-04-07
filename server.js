//Setting up the server file. Express//
var http=require('http');
http.createServer(function(req,res){
    res.end('Hello World');
}).listen(3000);

var PORT = process.env.PORT || 3000;

//parses our HTML and helps us find elements
//Dependencies
var express = require("express");
//Initialize Express
var app = express();


var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
//Scrapping tool
var cheerio = require("cheerio");
//Makes HTTP request for HTML page
var request = require("request");
var mongojs = require("mongojs");

//Tell the console what server.js is doing
console.log("\n*********************\n"+
            "Grabbing every thread name and link\n" +
            "from Wired's webdev board:" +
            "\n************************\n");

//Making a request for Wired's "webdev" board, The pages's HTML is passes as the callback's third argument
request("https://www.wired.com/category/business/"), function(error, response, html) {
    //Load the HTML into cheerio and save it to a variable
    //'$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(html);

    // An empty array to save the data that we'll scrape
    var results = [];

    //With cheerio, find each h4-tag with the class "headline-link" and loop throught the results
    $("h4.headline-link").each(function(i, element){

    //With cheerio, find each p-tag with the "title" class
    //(i: iterator. element: the current element)
    $("p.title").each(function(i, element) {
        //save the text of the element in a "title" variable
        var title = $(element).text();

        // values for any "href" attributes that the child elements may have
        var link = $(element).children().attr("href");

        //Saving the results in an object that we'll push into the results array
        results.push({
            title: title,
            link: link
        });
    });

    //Logging the results
    console.log(results);
});





//-----------Database configuration==================//

var databaseUrl = "Wired";
var collections = ["headlines"];

//Use mongojs to hook the database to the db variable
var db = mongojs(databaseURl, collections);

//Make sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error){
    console.log("Database Error:", error);
});

//------------------Routes--------------------

//1. At the root path, send a simple hello world message to the browser
app.get("/", function(req, res){
    res.send("Hello world");
});

//2. At the "/all" path, display every entry in the headlines collection
app.get("/all", function(req, res){
    //Query: In our database, go to the headlines collection, then "find" everything
    db.headlines.find({}, function(err, found){
        //log any errors if the server encounters one
        if (err) {
            console.log(err);
        }
        //Otherwise, send the result of this query to the browser
        else {
            res.json(found);
        }
    });
});

}