const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use(
  '^/api/',
  createProxyMiddleware({
    target: 'http://localhost:9527',
    changeOrigin: true,
    ws: true,
    pathRewrite: {
      '^/api/': '',
    },
  }),
);

app.use(
  '^/py/',
  createProxyMiddleware({
    target: 'http://18.234.188.222:9138',
    changeOrigin: true,
    ws: false,
    pathRewrite: {
      '^/py/': '',
    },
  }),
);

app.listen(3721, () => {
  console.log('Node server is running on port 3721');
});
