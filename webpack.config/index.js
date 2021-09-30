const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config({ silent: true });
}

const entry = require('./entry');
const plugins = require('./plugins');
const output = require('./output');
const moduleConfig = require('./module');
const resolve = require('./resolve');
const devServer = require('./devServer');

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  module: moduleConfig,
  entry,
  plugins,
  output,
  resolve,
  devServer,
};
