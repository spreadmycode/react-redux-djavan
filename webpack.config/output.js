const path = require('path');
const { isDevelopment, webpackHost, webpackPort } = require('../config/env');

module.exports = {
  path: path.resolve(__dirname, '../dist'),
  filename: 'assets/[name]-[hash].js',
  chunkFilename: 'assets/[name]-[chunkhash].js',
  publicPath: isDevelopment ? `http://${webpackHost}:${webpackPort}/` : '/',
};
