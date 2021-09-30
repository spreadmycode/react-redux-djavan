const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const { isDevelopment } = require('../config/env');

const plugins = [
  // hot reload
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __DEVELOPMENT__: true,
    __DEVTOOLS__: true,
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      API_URL: JSON.stringify(process.env.API_URL),
    },
  }),
  new HtmlWebpackPlugin({
    template: 'src/IndexHTML.js',
    filename: './index.html',
  }),
  new CopyWebpackPlugin([
        { from: 'static', to: './assets' },
  ]),
  new webpack.ProvidePlugin({
    React: 'react',
  }),
];


if (isDevelopment) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = plugins;
