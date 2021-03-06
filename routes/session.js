var d = require('debug')('npostr:router:session');

var express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    models = require('../models');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.User.findById(id).then(function(user) {
    done(null, {username: user.get('id')});
  }).error(function(err) {
    done(err);
  });
});

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

var auchenticateOption = {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
};

var router = express.Router();

router.get('/login', login);
router.post('/sessions', passport.authenticate('local', auchenticateOption));
router.post('/logout', logout);

function login(req, res) {
  d('#login');

  // update redirect url
  auchenticateOption.successRedirect = req.session.fromUrl || '/';
  res.render('login', {errors: req.flash('error')});
}

function logout(req, res) {
  req.logout();
  res.redirect('/');
}

module.exports = router;
