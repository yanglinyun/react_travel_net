const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(createProxyMiddleware('/api', {
    target: 'https://mockend.com/yanglinyun/react_travel_net',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/"
    }
  }))
}
