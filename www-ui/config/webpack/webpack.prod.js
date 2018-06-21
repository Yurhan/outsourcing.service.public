var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: '#source-map',

  entry: {
    'vendor': helpers.buildPathFromRoot('src', 'vendor.ts'),
    'app': helpers.buildPathFromRoot('src', 'client.ts')
  },

  output: {
    path: helpers.buildPathFromRoot('dist'),
    publicPath: '/static/',
    filename: '[name].bundle.[hash].js',
    chunkFilename: '[id].chunk.[hash].js'
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.html$/,
      options: {
        htmlLoader: {
          minimize: false // workaround for ng2
        }
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        keep_fnames: true // https://github.com/angular/angular/issues/10618
      },
      sourceMap: true,
      comments: false,
      compress: {
        warnings: true
      }
    }),
    new webpack.DefinePlugin({
      IS_RELEASE_BUILD: JSON.stringify(true)
    }),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      allChunks: true
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ]
});