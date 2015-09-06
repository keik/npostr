var d = require('debug')('npostr:router:app');

var express       = require('express'),
    path          = require('path'),
    fs            = require('fs'),
    // express
    favicon       = require('serve-favicon'),
    morgan        = require('morgan'),
    cookieParser  = require('cookie-parser'),
    bodyParser    = require('body-parser'),
    session       = require('express-session'),
    extNegotiator = require('./helpers/express-ext-negotiator'),
    // authentication
    passport      = require('passport'),
    flash         = require('connect-flash'),
    realm         = require('./helpers/passport-realm'),
    // view engine
    ECT           = require('ect');

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

// authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// authentication filter
app.use(realm([/^\/console$/]));

// contebnt-negotiation support for `.ext` URI
app.use(extNegotiator);

// routings
app.use('/',        require('./routes/index'));
app.use('/console', require('./routes/console'));
app.use('/posts',   require('./routes/posts'));
app.use('/',        require('./routes/session'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
switch (app.get('env')) {
case 'development':
  // development error handler
  // will print stacktrace
  app.use(function(err, req, res, next) {
    d(err.stack);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
  break;
case 'production':
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
  break;
default:
}

module.exports = app;
