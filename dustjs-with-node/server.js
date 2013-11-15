var express = require('express'),
    routes = require('routes'),
    http = require('http'),
    fs = require('fs'),
    path = require('path'),
    dust = require('dust'),
    cons = require('consolidate');

var app = express();

app.engine('dust', cons.dust);

app.use('/js', express.static(path.join(__dirname, 'public/js')));

app.get('/', function(req, res) {
  res.redirect('/index.html');
});

//app.get(/(.*\.txt)/, function(req, res) {
//  res.sendfile(__dirname + req.params[0]);
//});

app.get('/index.html', function(req, res) {
//  req.originalUrl;
//  req._parsedUrl.pathname;
//  req._parsedUrl.path;
  if (req && req._parsedUrl) {
    res.render(req._parsedUrl.path.slice(1, -HTML_EXT_LENGTH), {
      title: 'Testing out dust.js server-side rendering',
      copy: 'Ardo Ardo'
    });
  }
});

app.configure(function() {
  app.set('view engine', 'dust');
  app.set('views', __dirname + '/views');
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
  app.use(app.router);
});

//app.configure('development', function(){
//  app.use(express.errorHandler());
//});

//app.use(function (err, req, res, next) {
//  console.error(err.stack);
//  res.send(500, 'Something broke! The f?!');
//});

http.createServer(app).listen(3000);