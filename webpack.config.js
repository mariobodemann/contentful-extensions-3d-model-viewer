var path = require('path')

module.exports = {
  entry: {
    'app': './app.js'
  },
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components|dist)/,
        loader: 'babel'
      }
    ]
  }

}
