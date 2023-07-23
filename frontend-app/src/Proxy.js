const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(  //게시판 cors
      createProxyMiddleware('/post', {
          target: 'https://jsonplaceholder.typicode.com',
          changeOrigin: true
      })
  )
};