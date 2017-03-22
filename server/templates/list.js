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
            <title>mindmap</title>
            <link href="/cos.ui/cos.ui.css" rel="stylesheet">

            <script src="/js/jquery.js"></script> 
          	<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0" />
          	<script>window.serveData=${serveData}</script>
        </head>
        <body>

            <nav class="top-navbar">
              <i class="fa fa-eercast"></i>
              <span class="logo-title">简梳</span>
              <span style="font-size:40px; color: #ec5f47;">.</span>
              <span style="color: gray">让表达更直白</span>
              <span class="my-jianshu">
                <a class="label label-primary" href="/list/my">我的简梳</a>
                <a class="label label-success" href="/list/favorite">我的收藏</a>

              </span>
            </nav>
            <div id="app"></div>
          	<script src="${js}"></script>
        </body>
      </html>
    `
  }
}
