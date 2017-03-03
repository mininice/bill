import path from 'path'
import Template from 'app-proto-recipes/template'
import { createRenderer } from 'vue-server-renderer'
import assetsUtils from '@webpack/assets-utils'

export default class DefaultTpl extends Template {
  constructor(serveData) {
    super(serveData)
    this.getWebpackAssetsInstance = assetsUtils(path.resolve(__dirname, 'assets.json'))
    this.renderToString = createRenderer().renderToString
  }

  getVueHtml() {
    const url = this.serveData.url;
    return new Promise((resolve, reject) => this.renderToString(this.page({url, serveData: this.serveData}), (err, html) => {
      if (err) {
        reject(err)
      } else {
        resolve(html)
      }
    }))
  }

  async toHtml() {
    const serveData = JSON.stringify(this.serveData)
    const js = this.getWebpackAssetsInstance()(this.key)
    const vueHtml = await this.getVueHtml()
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charSet="utf-8" />
          <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css">
          <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0" />
          <script>window.serveData=${serveData}</script>
        </head>
        <body>
          <div id="app">${vueHtml}</div>
          <script src="${js}"></script>
        </body>
      </html>
    `
  }
}
