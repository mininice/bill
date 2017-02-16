const path = require('path')
const merge = require('deepmerge')
const commonConfig = require('./common.config')

const resolve = path.resolve
const root = resolve(__dirname, '..')

const webpackConfig = {}

webpackConfig.target = 'node'

webpackConfig.output = {
  filename: '[name].js',
  path: path.resolve(root, 'client/bundles'),
  libraryTarget: 'commonjs2',
}

const nodeModules = Object.keys(require('../package.json').dependencies)

webpackConfig.externals = nodeModules

module.exports = merge(commonConfig, webpackConfig)
