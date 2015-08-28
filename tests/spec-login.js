var assert = require('chai').assert,
    request = require('supertest'),
    async = require('async'),
    app = require('../app'),
    models = require('../models');

// =============================================================================
// utils

// =============================================================================
// main

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
