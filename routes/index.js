var d = require('debug')('npostr:router:index');

var express = require('express');

var router = express.Router();
router.get('/', index);

function index(req, res, next) {
  d('#index');

  res.render('index', {title: 'npostr'});
}

module.exports = router;
