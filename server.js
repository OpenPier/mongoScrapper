//Setting up the server file. Express//

var express = require("express");
var bodyParser = require("body-parser");


var app = express();

//"public directory in the application directory for the app"//
app.use(express.static('public'));
//
app.use (bodyParser.urlencoded({
    extended: true
}));


//sets handlebars as the view engine
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));

app.set('view engine', 'handlebars');
//Will import routes to the server, thus providing access
var routes = require('./routes');
app.use("/", routes);

var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log(port);
});