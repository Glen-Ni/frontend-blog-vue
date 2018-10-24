const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
// 我是输出环境！！！
module.exports = {
  mode: 'production',
  entry: ['@babel/polyfill', './src/main.js'],
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    axios: 'axios',
    lodash: '_'
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
    // new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: false, // run dev时报错显示源文件，而不是bundle.js，方便debug，上线时改为false
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {}
        }]
      },
      {
        test: /.vue$/,
        use: [
          'vue-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  }
}
