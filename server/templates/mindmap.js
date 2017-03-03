import path from 'path'
import Template from 'app-proto-recipes/template'
import assetsUtils from '@webpack/assets-utils'


export default class DefaultTpl extends Template {
  constructor(serveData) {
    super(serveData)
    this.getWebpackAssetsInstance = assetsUtils(path.resolve(__dirname, 'assets.json'))
  }

  async toHtml() {
    const serveData = JSON.stringify(this.serveData)
    const js = this.getWebpackAssetsInstance()(this.key)
    return `
      <!DOCTYPE html>
      <html>
        <head>
          	<meta charSet="utf-8" />
          	<!-- include libraries(jQuery, bootstrap) -->
      			<!-- include summernote css/js-->

            <link href="http://cs0.meituan.net/cos.ui/cos-ui.css" rel="stylesheet">
            <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.js"></script> 
            <script src="/js/go.js"></script>
          	<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0" />
          	<script>window.serveData=${serveData}</script>
        </head>
        <body>
            <div id="app"></div>
          	<script src="${js}"></script>
        </body>
      </html>
    `
  }
}
