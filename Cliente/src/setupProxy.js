const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/java',
        createProxyMiddleware({
            target: "https://10.0.0.155:8080",
            changeOrigin: false,
            pathRewrite: {
                '^/java': ''
            }
        })
    );
};