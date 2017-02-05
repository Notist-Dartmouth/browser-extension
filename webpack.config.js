var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'popup.js'
  },
  module: {
    rules: [
      {
          test: /\.(js|jsx)$/,
          include: './src',
          use: 'babel-loader',
          exclude: /node_modules/,
          include: path.resolve(__dirname, 'src')
      }
    ]
  }
}
