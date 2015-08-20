/* eslint no-console: [0] */

module.exports = {
  d: function(tag) {
    return function() {
      var newArgs = Array.prototype.concat.apply(
        ['%c' + tag.concat('                ').substr(0, 16), 'font-weight: bold; color: #0088ff'],
        arguments
      )
      if (window.DEBUG) console.log.apply(console, newArgs);
    }
  }
}
