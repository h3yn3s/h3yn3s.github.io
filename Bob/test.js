var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './src/index',
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('app.css', { allChunks: true }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse('true')),
    }),
    new HtmlWebpackPlugin({
      title: 'zlyde Redirect',
      filename: 'index.html',
      template: 'index.dev.template.html'
    }),
    new CopyWebpackPlugin([
      { from: 'src/static' }
    ]),
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'react-hot!babel'},
      { test: /\.css?$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
    ],
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules',
    ],
    extensions: ['', '.js', '.jsx', '.css']
  },
  node: {
    fs: "empty"
  },
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './build',
    hot: true
  }
};
