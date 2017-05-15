const path = require('path');

module.exports = {
  entry: {
    content: path.resolve(__dirname, 'src/content.js'),
    background: path.resolve(__dirname, 'src/background.js'),
    explore: path.resolve(__dirname, 'src/lib/scripts/explore.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      },
    ],
  },
};
