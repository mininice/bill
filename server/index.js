const babelConfig = require('../babel.config.js')
require('babel-register')(babelConfig)
require('babel-polyfill')

const env = process.env.NODE_ENV || 'development'

if (env === 'https') {
  require('./main-encrypt')
} else if (env !== 'production') {
  require('./main-localhost')
} else {
  require('./main')
}
