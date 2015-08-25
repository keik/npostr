/* globals describe: false it: false, before: false, beforeEach: false */

var assert = require('chai').assert,
    request = require('supertest'),
    async = require('async'),
    app = require('../app'),
    models = require('../models');

// =============================================================================
// utils

function str() {
  return JSON.stringify.apply({}, arguments);
}
function parse() {
  return JSON.parse.apply({}, arguments);
}

/**
 * @param {Array.<String>} titles for dummy posts
 * @param {Function} cb Callback function for verify
 */
function createDummyPosts(titles, cb) {
  async.each(titles, function(title, done) {
    var data = {
      title: title,
      content: '# ' + title +
        'this is a post of ' + title,
      alias: title
    };
    request(app).post('/posts').send(data).end(done);
  }, function(err) {
    if (err) throw err;
    cb(err);
  });
}

// =============================================================================
// main

before(function(done) {
  models.sequelize.sync().then(function() {
    done();
  });
});

beforeEach(function() {
  models.Post.truncate();
});

describe('`posts` method', function() {

  describe('GET /posts', function() {

    it('when there are 3 posts, responses 200 and body with all items', function(done) {
      // setup
      createDummyPosts(['d1', 'd2', 'd3'], function() {

        // verify
        request(app).get('/posts.json').expect(200).expect(function(res) {
          if (res.body.length !== 3) throw new Error('body length are ' + res.body.length + ', not 3');
        }).end(done);
      });

    });

    it('when no posts, responses 200 and body with empty array', function(done) {
      // setup (no posts)

      // verify
      request(app).get('/posts.json').expect(200).expect(function(res) {
        if (res.body.length !== 0) throw new Error('body length are ' + res.body.length + ', not 0');
      }).end(done);
    });

  }); // GET /posts

  describe('GET /posts/:id (or alias)', function() {

    it('when speficy :id valid ID, response 200 and body with a specified post', function(done) {
      // setup
      createDummyPosts(['d1', 'd2', 'd3'], function() {

        // verify
        request(app).get('/posts/d1').expect(200).end(done);
      });
    });

    it('when spefify :id NOT valid ID, response 404 and body with a `not found` message', function(done) {
      // setup
      createDummyPosts(['d1', 'd2', 'd3'], function() {

        // verify
        request(app).get('/posts/d4').expect(404).end(done);
      });
    });

  }); // GET /posts/:id

  describe('POST /posts', function() {

    it('with parameters of complete post data, response 201', function(done) {
      // setup
      var data = {
        title: 'test 1',
        content: '# test 1\n' +
          'this is a post of test 1',
        alias: String(Number(new Date()))
      };

      // verify
      request(app).post('/posts').send(data).expect(201, done);
    });

  }); // POST /posts

});
