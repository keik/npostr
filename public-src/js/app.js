window.DEBUG = true;

var riot = require('riot');

require('./_tags');

var todosStore = require('./store/todos');
riot.mount('todo', {store: todosStore, data: todosStore.fetch()});
