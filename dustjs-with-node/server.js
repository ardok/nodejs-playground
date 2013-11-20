/**
 * Function to clone an object
 * @param obj object to clone
 * @returns {*} copy of that object
 */
function clone(obj) {
  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    var copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    var copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = clone(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    var copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}

var express = require('express'),
    routes = require('routes'),
    http = require('http'),
    fs = require('fs'),
    path = require('path'),
    dust = require('dust'),
    cons = require('consolidate');

var app = express();

var redirectToFunc = function (path) {
  return function (req, res) {
    res.redirect(path);
  };
};

var HTML_EXT = '.html';
var HTML_EXT_LENGTH = HTML_EXT.length;

var DEFAULT_DATA_HASH = {
  name: 'Ardo',
  cpright_name: 'Ardo, Inc'
};

app.engine('dust', cons.dust);

app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/fonts', express.static(path.join(__dirname, 'public/fonts')));

app.get('/', redirectToFunc('/index'));

//app.get(/(.*\.txt)/, function(req, res) {
//  res.sendfile(__dirname + req.params[0]);
//});

app.get('/index.html', redirectToFunc('/index'));
app.get('/index', function (req, res) {
//  req.originalUrl;
//  req._parsedUrl.pathname;
//  req._parsedUrl.path;
  if (req && req._parsedUrl) {
    var data = clone(DEFAULT_DATA_HASH);
    data['title'] = 'Testing out dust.js server-side rendering';
    data['sample_text'] = 'This is a sample text passed in from server.js file';

    // don't need the string at index 0 since it's just `/`
    res.render(req._parsedUrl.path.substr(1), data);
  }
});

app.get('/users.html', redirectToFunc('/users'));
app.get('/users', function (req, res) {
  if (req && req._parsedUrl) {
    var data = clone(DEFAULT_DATA_HASH);
    data['users'] = [
      {
        username: 'Ardo 1',
        age: 17
      },
      {
        username: 'Ardo 2',
        age: 18
      },
      {
        username: 'Ardo 3',
        age: 19
      },
      {
        username: 'Ardo 4',
        age: 20
      },
      {
        username: 'Ardo 5',
        age: 21
      }
    ];

    // don't need the string at index 0 since it's just `/`
    res.render(req._parsedUrl.path.substr(1), data);
  }
});

app.configure(function () {
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

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.send(500, 'Something broke! The f?!');
});

http.createServer(app).listen(3000);
console.log('Listening port 3000');