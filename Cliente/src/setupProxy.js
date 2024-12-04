const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/java',
        createProxyMiddleware({
            target: "http://107.23.120.117:8080", 
            changeOrigin: true
        })
    );
};