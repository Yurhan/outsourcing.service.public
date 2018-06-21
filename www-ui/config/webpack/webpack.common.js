var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
//TODO: webpack 2.1 only
//var TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
var autoprefixer = require('autoprefixer');
var fs = require('fs');
var helpers = require('./helpers');

module.exports = {
  resolve: {
    extensions: ['.js', '.ts'],
    //remove 'webpack' from the package.json properies that webpack considers for module resolution. 
    //This is to workaround a load issue caused by the 'iselement' module used by 'dom-autoscroller'
    mainFields: ['browser', 'module', 'main']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'string-replace-loader',
        enforce: 'pre',
        options: {
          multiple: [
            {
              //remove moduleId from PDS components
              search: 'moduleId: module.id,?',
              replace: '',
              flags: 'g'
            },
            {
              //rewrite templateUrl refs as require statements in PDS components
              search: `templateUrl: ['|"](.*)['|"]`,
              replace: `template: require('\$1')`,
              flags: 'g'
            }
            //Note: Style URLs may also need to be handled in the future.
          ]
        }
      },
      //typescript
      {
        test: /.ts$/,
        exclude: /\.(spec|e2e)\.ts$/,
        use: [
          'awesome-typescript-loader',
          {
            loader: 'angular-router-loader',
            options: {
              loader: 'system'
            }
          },
          'angular2-template-loader'
        ]
      },
      //html
      {
        //exclude web components
        test: /^((?!pds\-components).)*\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              interpolate: true
            }
          }
        ]
      },
      //static assets
      //Note: [hash] is removed for web component support
      {
        test: /\.(png|jpe?g|gif|ico|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext]'
          }
        }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
            name: 'assets/[name].[ext]'
          }
        }
      },
      //styles
      {
        //global
        test: /\.css$/,
        exclude: helpers.buildPathFromRoot('src', 'app'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: (loader) => [
                require('autoprefixer')({ browsers: ['last 2 versions'] })
              ]
            }
          }],
          allChunks: true
        })
      },
      {
        //component
        test: /\.css$/,
        include: helpers.buildPathFromRoot('src', 'app'),
        use: ['raw-loader', 'postcss-loader']
      },
      {
        //global
        test: /\.scss$/,
        exclude: helpers.buildPathFromRoot('src', 'app'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: (loader) => [
                require('autoprefixer')({ browsers: ['last 2 versions'] })
              ]
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [
                helpers.buildPathFromRoot('node_modules', 'foundation-sites', 'scss'),
                helpers.buildPathFromRoot('node_modules', 'font-awesome', 'scss'),
                helpers.buildPathFromRoot('src', 'styles')
              ]
            }
          }],
          allChunks: true
        })
      },
      {
        //component
        test: /\.scss$/,
        include: helpers.buildPathFromRoot('src', 'app'),
        use: [
          'raw-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('autoprefixer')({ browsers: ['last 2 versions'] })
              ]
            }
          }
        ]
      },
      //i18n
      {
        test: /\.xlf$/,
        include: helpers.buildPathFromRoot('locale'),
        use: {
          loader: 'file-loader',
          options: {
            name: 'locale/[name].[hash].[ext]'
          }
        }
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor'],
      minChunks: 2
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),

    //webpack 2.1 only
    //new TsConfigPathsPlugin(/* { tsconfig, compiler } */)
  ]
};