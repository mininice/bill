// babel.config for webpack\babel-register

const fs = require('fs')
const path = require('path')

const join = path.join
const resolve = path.resolve


const root = __dirname
const client = join(root, 'client')

const moduleAlias = {
  '@client': './client',
  '@server': './server',
  '@webpack': './webpack',
}

fs.readdirSync(resolve(client))
  .filter(dir => {
    try {
      return fs.statSync(path.resolve(client, dir)).isDirectory()
    } catch (e) {
      return false
    }
  })
  .reduce(dir => moduleAlias['@' + dir] = path.resolve(client, dir))

const moduleResolver = {
  root: [root],
  alias: moduleAlias,
}

module.exports = {
  presets: ["es2015", "stage-3"],
  plugins: [
    ['module-resolver', moduleResolver],
  ],
}
