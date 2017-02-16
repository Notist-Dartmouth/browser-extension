var path = require('path');

module.exports = {
  entry: {
    content: path.resolve(__dirname, 'src/content.js'),
    background: path.resolve(__dirname, 'src/background.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: './src',
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      }
    ]
  }
}
