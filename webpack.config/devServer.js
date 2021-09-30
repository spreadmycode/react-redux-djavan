const { webpackPort } = require('../config/env');

module.exports = {
  hot: true,
  inline: true,
  stats: { colors: true, modules: false, assets: false },
  headers: { 'Access-Control-Allow-Origin': '*' },
  port: webpackPort,
};
