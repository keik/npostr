var d = require('debug')('[v] posts-table.tag');

d('loaded');

module.exports = {
  fetch: function(opts) {
    var count = opts && opts.count || null;
    return fetch('/posts.json' + (count ? '?count=' + count : ''), {method: 'get'});
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
