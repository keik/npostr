var d = require('debug')('npostr:router:login');

var express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    models = require('../models');

passport.use(new LocalStrategy(
  function(username, password, done) {
    d('passport LocalStrategy');
    if (username === 'dummy')
      return done(null, {id: 'dummy'});
    return done(null, false);

    // TODO (snippets)
    // models.User.findOne({username: username}, function(err, user) {
    //   if (err)
    //     return done(err);
    //   if (!user)
    //     return done(null, false, {message: 'Incorrect username.'});
    //   if (!user.validPassword(password))
    //     return done(null, false, {message: 'Incorrect password.'});
    //   return done(null, user);
    // });
  }
));

var router = express.Router();

router.get('/', index);
router.post('/', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}));

function index(req, res) {
  d('#index');

  res.render('login');
}

module.exports = router;
