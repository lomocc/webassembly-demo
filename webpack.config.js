var webpack = require("webpack");
var HTMLWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var title = require('./package.json').description;
var path = require("path");

if (process.env.NODE_ENV == undefined)
  process.env.NODE_ENV = 'development';

console.log("NODE_ENV:%s", process.env.NODE_ENV);

var clientConfig = {
  entry:[
    path.resolve("src/index.js")
  ],
  output: {
    path: path.resolve("dist/www"),
    filename: "[name].js",
    chunkFilename: "chunk.[name].js?[chunkhash:8]"
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.json', '.less']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new HTMLWebpackPlugin({
      title: title,
      template: "./template/index.html"
    }),
    new CopyWebpackPlugin([
      { context:"./template", from: '**/*', copyUnmodified:true, ignore: 'index.html'}
    ])
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader']
    }, {
      test: /\.(png|svg|ttf|xml)$/,
      loader: 'file-loader?name=assets/[name].[ext]?[hash:8]'
    }]
  }
};

if (process.env.NODE_ENV == "development") {
  // 开发版
  // config.devtool = "#source-map";
  // clientConfig.entry.push('webpack-hot-middleware/client?reload=true');
  // clientConfig.plugins.push(
  //   new webpack.HotModuleReplacementPlugin()
  // );
}
module.exports = [clientConfig];
