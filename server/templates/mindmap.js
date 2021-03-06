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
    var page = this.serveData.page;
    const js = this.getWebpackAssetsInstance()(page);
    return `
      <!DOCTYPE html>
      <html>
        <head>
          	<meta charSet="utf-8" />
          	<!-- include libraries(jQuery, bootstrap) -->
      			<!-- include summernote css/js-->
            <title>简梳</title>
            <link href="http://cs0.meituan.net/cos.ui/cos-ui.css" rel="stylesheet">
            <script src="/js/jquery.js"></script> 
            <script src="/js/go.js"></script>
            <script src="/js/TextEditor.js"></script>
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
