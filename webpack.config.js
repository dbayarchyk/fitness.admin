const HtmlWebPackPlugin = require("html-webpack-plugin");
const RelayCompilerWebpackPlugin = require('relay-compiler-webpack-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

const relayCompilerPlugin = new RelayCompilerWebpackPlugin({
  schema: path.resolve(__dirname, './src/schema.graphql'), // or schema.json
  src: path.resolve(__dirname, './src'),
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  plugins: [relayCompilerPlugin, htmlPlugin],
  devServer: {
    port: 3000,
    historyApiFallback: true
  },
};