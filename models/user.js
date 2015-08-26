'use strict';
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {type: DataTypes.STRING, primaryKey: true},
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      hashPassword: function(rawPassword, done) {
        bcrypt.genSalt(10, function(err, salt) {
          if (err) throw err;
          bcrypt.hash(rawPassword, salt, function(err, encrypted) {
            if (err) throw err;
            return done(encrypted);
          });
        });
      }
    },
    instanceMethods: {
      verifyPassword: function(password, done) {
        bcrypt.compare(password, this.password, function(err, res) {
          if (err) throw err;
          done(res);
        });
      }
    }
  });
  return User;
};
