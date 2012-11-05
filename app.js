

/**
 * Module dependencies.
 */

var express = require('express')
  , index = require('./routes/index')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, '/public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  
  //same as ?
 /* app.use(function(err, req, res, next){
  // logic
	});*/
});

/*
In Express define url schema for website using app.get(), app.post(), app.delete() etc.
*/
app.get('/', index.index);
app.get('/resume', index.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
