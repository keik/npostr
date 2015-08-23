var d = require('debug')('npostr:router:posts');

var express = require('express'),
    marked = require('marked'),
    models = require('../models');


var router = express.Router();

/* GET home page. */
/* eslint no-spaced-func: [0] */
router.get   ('/',         index);
router.get   ('/:id',      show);
router.post  ('/',         create);
router.get   ('/:id/edit', edit);
router.put   ('/:id',      update);
router.delete('/:id',      destroy);

function index(req, res, next) {
  d('#index');

  models.Post.findAll().then(function(posts) {
    res.format({
      html: function() {
        res.render('posts/index', {posts: posts});
      },
      json: function() {
        res.json(posts);
      }
    });
  });
}

function show(req, res, next) {
  d('#show');

  models.Post.findOne({
    // find one using `id` OR `alias`
    where: models.Sequelize.or(
      // :id part can both `id` (Number) or `alias` (String)
      {id: isNaN(req.params.id) ? -1 : req.params.id},
      {alias: req.params.id}
    )}).then(function(post) {
      if (post == null)
        return res.sendStatus(404);
      return res.json(post);
    }).error(function(e) {
      // TODO handling
      throw e;
    });
}

/**
 * Create a new post.
 * @param {req} req req
 * @param {String} req.params.title title of the post
 * @param {String} req.params.content main content, Markdown formed.
 * @param {String} [req.params.alias] unique id of the post, consisted of characters `0-9`, `a-z` and `-`.
 * @param {res} res res
 * @param {next} next next
 */
function create(req, res, next) {
  d('#create');

  // TODO move validation to model logic
  var alias = req.body.alias || String(Number(new Date()));
  if (alias.match(/[^0-9a-z\-]/)) {
    throw new Error('`alias` must not contain `0-9`, `a-z` and `-`');
  }

  var post = req.body;

  // generate HTML
  post.htmlizedContent = marked(post.content);

  models.Post.create(req.body).then(function() {
    res.sendStatus(201);
  }).error(function(e) {
    // TODO handling
    throw e;
  });
}

function edit(req, res, next) {
  d('#edit');
  res.sendStatus(501); // TODO
}

function update(req, res, next) {
  d('#update');
  res.sendStatus(501); // TODO
}

function destroy(req, res, next) {
  d('#destroy');

  models.Post.destroy({
    where: {id: req.params.id}
  }).then(function(deletedCount) {
    if (deletedCount > 0)
      res.sendStatus(200);
    res.sendStatus(404);
  }).error(function(e) {
    // TODO handling
    throw e;
  });
}

module.exports = router;
