var d = require('debug')('npostr:router:login');

var express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    models = require('../models');

passport.use(new LocalStrategy(
  function(username, password, done) {
    d('passport LocalStrategy');

    models.User.findOne({
      where: {id: username}
    }).then(function(user) {
      if (user) {
        return user.verifyPassword(password, function(result) {
          if (result)
            return done(null, user);
          return done(null, false, {message: 'Incorrect username or password.'});
        });
      }
      return done(null, false, {message: 'Incorrect username or password.'});
    }).error(function(err) {
      throw err;
    });
  }
));

var router = express.Router();

var auchenticateOption = {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
};

router.get('/', index);
router.post('/', passport.authenticate('local', auchenticateOption));

function index(req, res) {
  d('#index');

  // set redirect url
  auchenticateOption.successRedirect = req.session.fromUrl || '/';
  res.render('login', {errors: req.flash('error')});
}

module.exports = router;
