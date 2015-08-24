var d = require('../utils').d('[m] posts');

module.exports = {
  fetch: function() {
    return fetch('/posts.json', {method: 'get'});
  },
  save: function(post) {
    throw new Error('NOT IMPLEMENTED');
  },
  destroy: function(id) {
    return fetch('/posts/' + id, {
      method: 'delete'
    });
  }
};
