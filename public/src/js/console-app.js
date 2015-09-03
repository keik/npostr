/*
 * console-app
 */

// load utils
require('./polyfills');
require('./utils')(global);

// load libs
var riot = require('riot');

// load parts for riot
require('./tags/console-app.tag');
require('./tags/posts-table.tag');
require('./tags/new-post.tag');
require('./tags/edit-post.tag');
require('./tags/settings.tag');

// commons
require('./tags/tab.tag');

riot.mount('console-app');
