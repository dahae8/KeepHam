// setupProxy.js 또는 setupProxy.ts

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // 프록시할 API 경로
    createProxyMiddleware({
      target: 'http://localhost:5000', // 실제 API 서버 주소
      changeOrigin: true,
    })
  );
};
