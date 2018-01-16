const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  context: path.join(__dirname, './src'),
  entry: './client.js',
  devtool: 'source-map',
  target: 'node',
  output: {
    path: path.join(__dirname, './dist'),
    libraryTarget: 'commonjs2',
    filename: 'cadu.js',
    sourceMapFilename: 'cadu.js.map',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/,
      },
    ],
  },
  node: {
    global: true,
    Buffer: true,
    crypto: 'empty',
    net: 'empty',
    dns: 'empty'
  },
  externals: [nodeExternals()],
}

