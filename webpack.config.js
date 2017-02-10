var validate = require('webpack-validator'),
path = require('path');

var config = {
  devtool: 'source-map',
  entry: './app/assets/scripts/App.js',
  output: {
    // path: path.resolve('app/temp/scripts'),
    filename: 'App.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = validate(config);