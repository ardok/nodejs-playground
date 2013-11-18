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
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/fonts', express.static(path.join(__dirname, 'public/fonts')));


app.get('/', function(req, res) {
  res.redirect('/index');
});

//app.get(/(.*\.txt)/, function(req, res) {
//  res.sendfile(__dirname + req.params[0]);
//});

var HTML_EXT = '.html';
var HTML_EXT_LENGTH = HTML_EXT.length;

app.get('/index.html', function(req, res) {
  res.redirect('/index');
});
app.get('/index', function(req, res) {
//  req.originalUrl;
//  req._parsedUrl.pathname;
//  req._parsedUrl.path;
  if (req && req._parsedUrl) {
    res.render(req._parsedUrl.path.slice(1, -HTML_EXT_LENGTH), {
      title: 'Testing out dust.js server-side rendering',
      name: 'Ardo',
      cpright_name: 'Ardo, Inc.',
      sample_text: 'This is a sample text passed in from server.js file'
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
console.log('Listening port 3000');