window.DEBUG = true;

require('./polyfills');

var riot = require('riot');

require('./tags/posts.tag');

var postsStore = require('./stores/posts.js');

riot.mount('posts', {store: postsStore});
