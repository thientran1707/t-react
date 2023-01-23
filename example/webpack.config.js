const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DEBUG = process.env.DEBUG === 'true';

const config = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
  devServer: {
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      react: 'teact',
    },
  },
};

if (DEBUG) {
  config.optimization = {
    minimize: false,
    minimizer: [],
  }
}

module.exports = config;
