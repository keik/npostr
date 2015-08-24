/*
 * main-app
 */

// load utils
require('./polyfills');
require('./utils')(global);

// load libs
var riot = require('riot');

// load parts for riot
require('./tags/posts.tag');
var postsStore = require('./stores/posts.js');

init();

/**
 * Initialize
 */
function init() {
  riot.mount('posts', {store: postsStore});
}
