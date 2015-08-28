module.exports = function(realm) {
  realm = Array.isArray(realm) ? realm : [realm];

  return function(req, res, next) {
    if (!req.user) {
      var requireAuth = realm.some(function(rpath) {
        return req.originalUrl.match(rpath);
      });
      if (requireAuth) {
        req.session.fromUrl = req.originalUrl;
        return res.redirect('/login');
      }
    }
    return next();
  };
};
