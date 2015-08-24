/*
 * console-app
 */

// load utils
require('./polyfills');
require('./utils')(global);

// load libs
var riot = require('riot');

// load parts for riot
require('./tags/posts-table.tag');
var postsStore = require('./stores/posts.js');

init();

/**
 * Initialize
 */
function init() {

  riot.mount('posts-table', {store: postsStore});

  // add event handlers
  $('#menu').addEventListener('click', onClickMenu);
}

function onClickMenu(e) {
  if (Array.prototype.indexOf.apply(e.currentTarget.querySelectorAll('a'), [e.target]) === -1)
    return;

  var menuId = e.target.href.match(/#(.+)/)[1];
  fetch('/console/menu/' + menuId).then(function(res) {
    return res.text();
  }).then(function(body) {
    var mainEl = $('#main');
    mainEl.innerHTML = body;
    riot.mount('posts-table', {store: postsStore});
  });
}
