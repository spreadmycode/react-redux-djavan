const importPlugin = require('postcss-import');
const cssNextPlugin = require('postcss-cssnext');
const calcPlugin = require('postcss-calc');
const { isDevelopment } = require('../config/env');


module.exports = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    },
    {
      test: /\.css$/,
      use: [{
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: isDevelopment,
          modules: true,
          importLoaders: 1,
          localIdentName: '[name]__[local]___[hash:base64:5]',
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: wp => [
            importPlugin({
              addDependencyTo: wp,
            }),
            cssNextPlugin(),
            calcPlugin(),
          ],
        },
      },
      ],
    },
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      use: 'url-loader?limit=10000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]',
    },
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      use: 'url-loader?limit=10000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]',
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: 'url-loader?limit=10000&mimetype=application/octet-stream&name=assets/fonts/[name].[ext]',
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      use: 'url-loader?limit=10000&name=assets/fonts/[name].[ext]',
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: 'url-loader?limit=10000&mimetype=image/svg+xml&name=assets/fonts/[name].[ext]',
    },
    {
      test: /(\.json)$/,
      use: 'json-loader',
    },
    {
      test: /(\.jpeg|\.jpg|\.png|\.gif)$/,
      use: 'url-loader?limit=10240',
    },
  ],
};
