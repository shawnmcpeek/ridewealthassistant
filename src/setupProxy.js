const { createProxyMiddleware } = require("http-proxy-middleware");
const setHeaders = require("./headers");

module.exports = function (app) {
  app.use(function (req, res, next) {
    setHeaders(res, req.path);
    next();
  });

  // ... (other proxy configuration, if any)
};
