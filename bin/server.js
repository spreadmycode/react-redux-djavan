const express = require('express');
const http = require('http');
const httpProxy = require('http-proxy');
const path = require('path');
const { port, webpackHost, webpackPort, isDevelopment } = require('../config/env');

const app = express();
const server = new http.Server(app);

if (isDevelopment) {
  // eslint-disable-next-line global-require
  const staticFile = require('connect-static-file');
  app.use(express.static(path.join(__dirname, '../dist')));
  app.use('*', staticFile(path.join(__dirname, '../dist/index.html')));
} else {
  const webpackUrl = `http://${webpackHost}:${webpackPort}`;
  const proxy = httpProxy.createProxyServer({
    target: webpackUrl,
    ws: true,
  });

  proxy.on('error', (error, req, res) => {
    if (error.code !== 'ECONNRESET') {
      // eslint-disable-next-line no-console
      console.error('proxy error', error);
    }

    if (!res.headersSent) {
      res.writeHead(500, { 'content-type': 'application/json' });
    }

    const json = { error: 'proxy_error', reason: error.message };

    res.end(JSON.stringify(json));
  });

  app.use('*', (req, res) => {
    proxy.web(req, res, { target: webpackUrl });
  });

  server.on('upgrade', (req, socket, head) => {
    proxy.ws(req, socket, head);
  });
}

app.listen(port, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  } else {
    // eslint-disable-next-line no-console
    console.info(`Server listening on port ${port}!`);
  }
});
