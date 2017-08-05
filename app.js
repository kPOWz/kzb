

/**
 * Module dependencies.
 */

var express = require('express')
  , index = require('./routes/index')
  , errorHandler = require('errorhandler')
  , http = require('http')
  , lessMiddleware = require('less-middleware')
  , path = require('path')
  , bodyParser = require('body-parser')
  , expressLogger = require('express-logger')
  , expressFavicon = require('express-favicon')
  , methodOverride = require('method-override');

var app = express();


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(expressFavicon(__dirname + '/public/images/favicon.ico'));
app.use(expressLogger({path: "dev"}));
app.use(bodyParser());
app.use(methodOverride());
//Middleware and routes are now executed in the order they're added in Express 4.

/*
In Express define url schema for website using app.get(), app.post(), app.delete() etc.
*/
app.get('/', index.index);
app.get('/resume', index.index);

app.use(lessMiddleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

const env = process.env.NODE_ENV || 'development';
if ('development' == env) {
   app.use(errorHandler());
    //same as ?
    /* app.use(function(err, req, res, next){
     // logic
   	});*/
}

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
