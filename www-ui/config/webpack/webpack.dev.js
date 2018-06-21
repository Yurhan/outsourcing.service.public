var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const CONFIG = require('./load-config').CONFIG;

module.exports = webpackMerge(commonConfig, {
  devtool: '#cheap-module-eval-source-map',

  entry: {
    'vendor': helpers.buildPathFromRoot('src', 'vendor.ts'),
    'app': [
      `webpack-dev-server/client?http://localhost:${CONFIG.port}/`,
      'webpack/hot/dev-server',
      helpers.buildPathFromRoot('src', 'client.ts')]
  },

  output: {
    path: helpers.buildPathFromRoot('dist'),
    publicPath: '/static/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      IS_RELEASE_BUILD: JSON.stringify(false)
    }),
    //hot module support
    new webpack.HotModuleReplacementPlugin()
  ]
});