/*
 * console-app
 */

// load utils
require('./polyfills');
require('./utils')(global);

// load libs
var riot = require('riot'),
    marked = require('marked');

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
  document.addEventListener('keyup', onEditorKeyUp);
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

/** rendering timer */
var timer;

/**
 * Render Markdown
 */
function onEditorKeyUp(e) {
  if (e.target !== $('#editor-plain'))
    return;

  // supress excessive rendering
  if (timer)
    return;

  timer = setTimeout(function() {
    $('#editor-rendered').innerHTML = marked(e.target.value);
    timer = null;
  }, 200);
}
