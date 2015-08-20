var express = require('express');
var router = express.Router();

var path = require('path'),
    fs = require('fs'),
    marked = require('marked'),
    async = require('async');

var DATA_DIR = path.join(process.cwd(), '_data');

/* GET home page. */
/* eslint no-spaced-func: [0] */
router.get   ('/',         index);
router.get   ('/:id',      show);
router.get   ('/',         new_);
router.post  ('/',         create);
router.get   ('/:id/edit', edit);
router.put   ('/:id',      update);
router.delete('/:id',      destroy);

function index(req, res, next) {
  fs.readFile(path.join(DATA_DIR, 'entries.json'), {encoding: 'utf-8'}, function(err, entries) {
    if (err) throw err;
    res.render('posts/index', {entries: JSON.parse(entries)});
  });
}

function show(req, res, next) {
  async.map([path.join(DATA_DIR, req.params.id + '.md'), path.join(DATA_DIR, 'entries.json')],
            function(file, callback) {
              fs.readFile(file, {encoding: 'utf-8'}, callback);
            },
            function(err, results) {
              if (err) throw err;
              var entries = JSON.parse(results[1]),
                  ids = Object.keys(entries),
                  index = ids.indexOf(req.params.id);

              res.render('posts/post', {post: marked(results[0]), prev: ids[index - 1], next: ids[index + 1]});
            });
}

function new_(req, res, next) {
  // fs.readFile(path.join(DATA_DIR, req.params.id + '.md'), {encoding: 'utf-8'}, function(err, data) {
  //   if (err) throw err
  //   res.send(marked(data))
  // })
}

function create(req, res, next) {
  // fs.readFile(path.join(DATA_DIR, req.params.id + '.md'), {encoding: 'utf-8'}, function(err, data) {
  //   if (err) throw err
  //   res.send(marked(data))
  // })
}

function edit(req, res, next) {
  // fs.readFile(path.join(DATA_DIR, req.params.id + '.md'), {encoding: 'utf-8'}, function(err, data) {
  //   if (err) throw err
  //   res.send(marked(data))
  // })
}

function update(req, res, next) {
  // fs.readFile(path.join(DATA_DIR, req.params.id + '.md'), {encoding: 'utf-8'}, function(err, data) {
  //   if (err) throw err
  //   res.send(marked(data))
  // })
}

function destroy(req, res, next) {
  // fs.readFile(path.join(DATA_DIR, req.params.id + '.md'), {encoding: 'utf-8'}, function(err, data) {
  //   if (err) throw err
  //   res.send(marked(data))
  // })
}

module.exports = router;
