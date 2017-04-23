const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

// NODE_ENV
const env = process.env.NODE_ENV
const envTaskFactory = require('./envTask.js')
const envTask = envTaskFactory.createTask(env)

// Dirs
const sourceDir = __dirname + '/src'
const buildDir = __dirname + '/dist'


module.exports = {
  devtool: 'source-map',
  entry: sourceDir + '/index.js',
  output: {
    path: envTask(() => sourceDir, () => buildDir),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.html/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader?importLoaders=1&sourceMap!sass-loader'
      },
      {
        test: /\.(png|jpg|gif|woff)/,
        loader: 'url-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules|lib/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-2']
        }
      }
    ]
  },
  plugins: envTask(null, () => {
    return [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(env)
        }
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      })
    ]
  })
}
