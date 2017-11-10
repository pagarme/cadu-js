const { join } = require('path')
const { merge } = require('ramda')

const base = require('./webpack.config.js')

const config = {
  target: 'web',
  output: {
    path: join(__dirname, './browser'),
    library: 'cadu',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: 'cadu.js',
    sourceMapFilename: 'cadu.js.map',
  },
}

module.exports = merge(base, config)
