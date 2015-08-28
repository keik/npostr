var d = require('debug')('npostr:router:app');

var express = require('express');
var path = require('path');
var fs = require('fs');
// var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var realm = require('./helpers/passport-realm');
var models = require('./models');

var routes = require('./routes/index');
var rconsole = require('./routes/console');
var rposts = require('./routes/posts');
var rlogin = require('./routes/login');

var ECT = require('ect');

var app = express();

// view engine setup
var ectRenderer = ECT({watch: true, root: path.join(__dirname, 'views'), ext: '.ect'});
app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

switch (app.get('env')) {
case 'development':
  app.use(morgan('dev'));
  break;
case 'production':
  var accessLogStream = fs.createWriteStream(path.join(__dirname, '/access.log'), {flags: 'a'});
  app.use(morgan('combined', {stream: accessLogStream}));
  break;
default:
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/dist')));
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.serializeUser(function(user, done) {
  d('#serialUser');
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  d('#deserialUser');
  models.User.findById(id).then(function(user) {
    done(null, {username: user.get('id')});
  }).error(function(err) {
    done(err);
  });
});

// authentication filter
app.use(realm([/^\/console$/]));

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
app.use('/login', rlogin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
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
