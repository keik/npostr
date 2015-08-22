/* globals describe: false it: false, beforeEach: false */

var assert = require('chai').assert,
    request = require('supertest'),
    async = require('async'),
    app = require('../app');

function str() { return JSON.stringify.apply({}, arguments); }
function parse() { return JSON.parse.apply({}, arguments); }
function recreateTable() {
  // stub
}
function createDummyPosts(titles, cb) {
  async.each(titles, function(title, done) {
    var data = {
      title: title,
      content: '# ' + title +
        'this is a post of ' + title,
      alias: title
    };

    // verify
    request(app).post('/posts').send(data).end(done);
  }, function(err) {
    if (err) throw err;
    cb(err);
  });
}


var models = require('../models');

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
        request(app).get('/posts').expect(200).expect(function(res) {
          if (res.body.length !== 3) throw new Error('body length are ' + res.body.length + ', not 3');
        }).end(done);
      });

    });

    it('when no posts, responses 200 and body with empty array', function(done) {
      // setup (no posts)

      // verify
      request(app).get('/posts').expect(200).expect(function(res) {
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

    // it('when spefify :id valid alias, response 200 and body with a specified post', function(done) {
    //   // setup
    //   createDummyPosts(['d1', 'd2', 'd3']);
    //
    //   // verify
    //   req.get('http://localhost:3000/posts/d1-alias', function(e, r, body) {
    //     assert.fail(true);
    //     done();
    //   });
    // });
    //
    // it('when spefify :id NOT valid alias, response 404 and body with a `not found` message', function(done) {
    //   // setup
    //   createDummyPosts(['d1', 'd2', 'd3']);
    //
    //   // verify
    //   req.get('http://localhost:3000/posts/d4-alias', function(e, r, body) {
    //     assert.fail(true);
    //     done();
    //   });
    // });

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
