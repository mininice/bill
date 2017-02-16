const isProduction = process.env.NODE_ENV === 'production'

function returnFirstArg (argOne) { return argOne }

/**
 * @description Assets 返回一个获取 assets 地址的函数
 * @param {Object} webpackAssets 由 assets-webpack-plugin 生成的 JSON 内容,详见 {@link ../assets.json}
 * @param {Function} [baseParser] 用于处理结果的后置函数
 * @returns {Function}
 * @constructor
*/
function assets (webpackAssets, _baseParser) {
  const baseParser = _baseParser || returnFirstArg

  /**
   * @description 获取资源地址
   * @link webpack/assets.json
   * @param {String} chunkName 入口资源的名字
   * @param {String} [kind] 资源类型
   * @returns {String} 资源地址
   * @throw {ReferenceError} 未找到指定资源
   */
  return function generatePath (chunkName, _kind) {
    const kind = _kind || 'js'
    if (!webpackAssets[chunkName] || !webpackAssets[chunkName][kind]) {
      throw new ReferenceError(`["${chunkName}"]["${kind}"] is not in assets object.`)
    }
    return baseParser(webpackAssets[chunkName][kind])
  }
}

export default function (assetsPath) {
  let cache = null
  return function getWebpackAssetsInstance () {
    if (!isProduction) {
      cache = null
      delete require.cache[assetsPath]
    }
    if (cache) return cache
    cache = assets(require(assetsPath))
    return cache
  }
}
