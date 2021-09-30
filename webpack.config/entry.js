const { isDevelopment, webpackHost, webpackPort } = require('../config/env');

const entry = {
  main: [
    'babel-polyfill',
    './src',
  ],
};

if (isDevelopment) {
  entry.main.unshift(
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${webpackHost}:${webpackPort}`,
    'webpack/hot/only-dev-server',
  );
}

module.exports = entry;
