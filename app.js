var d = require('debug')('npostr:router:app');

var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var rconsole = require('./routes/console');
var rposts = require('./routes/posts');

var ECT = require('ect');

var app = express();

// view engine setup
var ectRenderer = ECT({watch: true, root: path.join(__dirname, 'views'), ext: '.ect'});
app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/dist')));

// content-negotiation support for `.ext` URI
app.use(function(req, res, next) {
  var parts = req.url.match(/(.+)\.(json|html)$/);
  if (parts) {
    req.url = parts[1];
    switch (parts[2]) {
    case 'html':
      req.headers.accept = 'text/html';
      break;
    case 'json':
      req.headers.accept = 'application/json';
      break;
    default:
    }
  }
  next();
});

// routings
app.use('/', routes);
app.use('/console', rconsole);
app.use('/posts', rposts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development' || app.get('env') === 'test') {
  app.use(function(err, req, res, next) {
    d(err.stack);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
