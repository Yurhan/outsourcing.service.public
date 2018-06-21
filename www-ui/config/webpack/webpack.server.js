var webpack = require('webpack');
var helpers = require('./helpers');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: {
    'server': helpers.buildPathFromRoot('src', 'server.ts')
  },

  target: 'node',

  node: {
    __dirname: false
  },

  output: {
    path: helpers.buildPathFromRoot('dist'),
    filename: '[name].js',
    chunkFilename: '[id].[hash].chunk.js',
    libraryTarget: 'commonjs'
  },

  externals: nodeModules,

  devtool: '#sourcemap',

  resolve: {
    extensions: ['.js', '.ts']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader']
      }
    ]
  },

  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false,
      compress: {
        warnings: true
      }
    })
  ]
}