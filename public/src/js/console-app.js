window.DEBUG = true;

require('./polyfills');

require('./tags/posts-table.tag');

var riot = require('riot');

function $() {
  return document.querySelector.apply(document, arguments);
}
function $$() {
  return document.querySelectorAll.apply(document, arguments);
}

var postsStore = require('./stores/posts.js');

riot.mount('posts', {store: postsStore});

$('#menu').addEventListener('click', function(e) {
  if (Array.prototype.indexOf.apply(e.currentTarget.querySelectorAll('a'), [e.target]) === -1) {
    return;
  }

  var menuId = e.target.href.match(/#(.+)/)[1];
  fetch('/console/menu/' + menuId).then(function(res) {
    return res.text();
  }).then(function(body) {

    var mainEl = $('#main');
    mainEl.innerHTML = body;
    riot.mount('posts', {store: postsStore});
  });

  return;
});
