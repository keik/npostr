var d = require('debug')('npostr:router:console');

var express = require('express');
var router = express.Router();

router.get('/', index);
router.get('/menu/:id', menu);

function index(req, res, next) {
  d('#index');

  if (req.user)
    res.render('console/index', {username: req.user.username});
  else
    res.redirect('/login');
}

function menu(req, res, next) {
  d('#menu');
  res.render('console/menus/' + req.params.id);
}

module.exports = router;
