import { Express } from 'express'; // 필요한 Express 모듈 타입 임포트

const createProxyMiddleware = require('http-proxy-middleware');

module.exports = (app: Express) => {
  app.use(
    createProxyMiddleware(['/api', '/socket.io'], {
      target: 'https://i9c104.p.ssafy.io/',
      changeOrigin: true,
      ws: true,
      router: {
        '/socket.io': 'wss://i9c104.p.ssafy.io',
      },
    })
  );
};
