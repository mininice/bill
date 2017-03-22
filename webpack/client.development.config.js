const fs = require('fs')
const path = require('path')
const AssetsPlugin = require('assets-webpack-plugin')
const webpackConfig = module.exports = require('./common.config')
console.log(webpackConfig.module);
const assetsPluginInstance = new AssetsPlugin({
  filename: 'assets.json',
  path: path.join(__dirname, '..', 'server', 'templates'),
})
webpackConfig.plugins = webpackConfig.plugins || []

webpackConfig.plugins.push(assetsPluginInstance)

const resolve = path.resolve
const client = path.resolve(__dirname, '../client')

const moduleAlias = {}
fs.readdirSync(resolve(client))
  .filter(dir => {
    try {
      return fs.statSync(resolve(client, dir)).isDirectory()
    } catch (e) {
      return false
    }
  })
  .forEach(dir => { moduleAlias['@' + dir] = resolve(client, dir) })

webpackConfig.resolve.alias = Object.assign({}, webpackConfig.resolve.alias, moduleAlias)
