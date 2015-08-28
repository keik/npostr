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

describe('`login` method', function() {

  before(function(done) {
    // TODO initialize admin user
    models.User.truncate().then(function() {
      models.User.findById('admin').then(function(user) {
        if (user == null) {
          console.log('not exist admin user. create now...');
          models.User.hashPassword('admin', function(encrypted) {
            models.User.create({
              id: 'admin',
              password: encrypted
            }).then(function(user) {
              console.log('created admin user');
              done();
            }).error(function(err) {
              throw err;
            });
          });
        }
      }).error(function(err) {
        throw err;
      });
    });
  });

  describe('POST /login', function() {

    it('with parameters of valid authentications, response 302 and redirect \'/\'', function(done) {
      // setup
      var data = {
        username: 'admin',
        password: 'admin'
      };

      // verify
      request(app).post('/login').send(data).expect(302).end(function(err, res) {
        if (err) throw err;
        assert.equal(res.header.location, '/');
        done();
      });
    });

    it('with parameters of invalid authentications, response 302 and redirect \'/login\'', function(done) {
      // setup
      var data = {
        username: 'BAD',
        password: 'BAD'
      };

      // verify
      request(app).post('/login').send(data).expect(302).end(function(err, res) {
        if (err) throw err;
        assert.equal(res.header.location, '/login');
        done();
      });
    });

    it('from \'/console\', with parameters of valid authentications, response 302 and redirect \'/console\'', function(done) {
      // setup
      var data = {
        username: 'admin',
        password: 'admin'
      };

      // verify
      // request for realms
      request(app).get('/console')
        .expect(302)
        .end(function(err, res) {
          if (err) throw err;
          assert.equal(res.header.location, '/login');


          // redirect
          request(app).get('/login')
            .set('Cookie', res.header['set-cookie'].map(function(c) {
              return c.split(';')[0];
            }).join('; '))
            .expect(200)
            .end(function(err, res) {
              if (err) throw err;

              // POST /login
              request(app).post('/login').send(data)
                .expect(302)
                .end(function(err, res) {
                  if (err) throw err;
                  assert.equal(res.header.location, '/console');
                  done();
                });
            });
        });
    });

  });

});
