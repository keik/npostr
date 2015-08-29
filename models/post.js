'use strict';

var d = require('debug')('npostr:model:post');

var marked = require('marked');

marked.setOptions({
  langPrefix: ''
});

module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    alias: {type: DataTypes.STRING, unique: true},
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    hooks: {

      /**
       * Set HTML markedown rendered in `htmlContent` property
       * @param {Post|Array.<Post>} posts posts
       */
      afterFind: function(posts) {
        if (!posts)
          return;

        if (!Array.isArray(posts))
          posts = [posts];

        posts.forEach(function(post) {
          post.setDataValue('htmlContent', marked(post.content));
        });
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Post;
};
