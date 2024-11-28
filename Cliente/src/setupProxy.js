const { createProxyMiddleware } = require('http-proxy-middleware');

// Proxy :) 
module.exports = function(app) {
    app.use(
        '/java',
        createProxyMiddleware({
            target: process.env.REACT_APP_API_URL,
            changeOrigin: false,
            pathRewrite: {
                '^/java': ''
            }
        })
    );
};