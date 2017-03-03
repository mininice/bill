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
      			<link href="http://netdna.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.css" rel="stylesheet">
      			<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.js"></script> 
      			<script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.js"></script> 

      			<!-- include summernote css/js-->
      			<link href="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.2/summernote.css" rel="stylesheet">
      			<script src="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.2/summernote.js"></script>
            <script src="/js/d3.js"></script>

          	<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0" />
          	<script>window.serveData=${serveData}</script>
        </head>
        <body>
            <div id="app">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-xs-4"><div id="summernote"></div></div>
                  <div class="col-xs-8"><div id="naotu-app"></div></div>
                </div>
              </div>
            </div>
          	<script src="${js}"></script>
        </body>
      </html>
    `
  }
}
