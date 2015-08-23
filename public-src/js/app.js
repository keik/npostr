window.DEBUG = true;

require('./polyfills');

var riot = require('riot');

require('./_app-tags');

var postsStore = require('./store/posts');

riot.mount('posts', {store: postsStore});
