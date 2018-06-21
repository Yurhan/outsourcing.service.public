var helpers = require('./helpers');

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        //only process the PDS with this preloader
        include: helpers.buildPathFromRoot('node_modules', 'powerschool-design-system'),
        test: /\.js$/,
        loader: 'string-replace-loader',
        enforce: 'pre',
        query: {
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
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: 'tsconfig.test.json'
            }
          },
          'angular2-template-loader'
        ]
      },
      {
        test: /\.ts$/,
        use: { loader: 'istanbul-instrumenter-loader' },
        include: helpers.buildPathFromRoot('src', 'app'),
        exclude: /\.spec\.ts$/,
        enforce: 'post'
      },
      {
        test: /\.html$/,
        use: 'html-loader'

      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'null-loader'
      },
      {
        test: /\.css$/,
        exclude: helpers.buildPathFromRoot('src', 'app'),
        use: 'null-loader'
      },
      {
        test: /\.css$/,
        include: helpers.buildPathFromRoot('src', 'app'),
        use: ['raw-loader', 'null-loader']
      },
      {
        test: /\.scss$/,
        exclude: helpers.buildPathFromRoot('src', 'app'),
        use: 'null-loader'
      },
      {
        test: /\.scss$/,
        include: helpers.buildPathFromRoot('src', 'app'),
        use: ['raw-loader', 'null-loader']
      }
    ]
  }
}