const { createProxyMiddleware } = require('http-proxy-middleware');
//The purpose of setting up a proxy server in this way is primarily to avoid issues with CORS policy during development

module.exports = function(app) {
  app.use(
    '/api', // through this /api when we're switching Ports between frontend 3000 and backend 5000
    createProxyMiddleware({
      target: 'http://localhost:5000', //backend is running on 5000 
      changeOrigin: true, // this allows access whenever Ports do change from front to back 
    })
  );
};
