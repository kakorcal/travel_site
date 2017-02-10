var webpack = require('webpack'),
validate = require('webpack-validator');
// path = require('path');

var config = {
  // devtool: 'source-map',
  entry: {
    App: './app/assets/scripts/App.js',
    Vendor: './app/assets/scripts/Vendor.js'
  },
  output: {
    // path: path.resolve('app/temp/scripts'),
    filename: '[name].js' // keeps filename dynamic
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
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: ['Vendor.js'] // don't create source map of vendor
    })
  ]
};

module.exports = validate(config);