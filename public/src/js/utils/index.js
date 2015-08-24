module.exports = function(context) {

  context.$ = context.$ || $;
  context.$$ = context.$$ || $$;

  /**
   * alias
   * @returns {Function} querySelector
   */
  function $() {
    return document.querySelector.apply(document, arguments);
  }

  /**
   * alias
   * @returns {Function} querySelectorAll
   */
  function $$() {
    return context.$$ || document.querySelectorAll.apply(document, arguments);
  }
};
