module.exports = function(req, res, next) {
  var parts = req.url.match(/(.+)\.(json|html)($|\?.+$)/);
  if (parts) {
    req.url = parts[1] + parts[3];
    switch (parts[2]) {
    case 'html':
      req.headers.accept = 'text/html';
      break;
    case 'json':
      req.headers.accept = 'application/json';
      break;
    default:
    }
  }
  next();
};
