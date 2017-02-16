const del = require('del')
const gulp = require('gulp')
const path = require('path')
const nodemon = require('nodemon')
const webpack = require('webpack')

const serverWebpackConfig = require('./webpack/server.config')
const clientWebpackConfig = require('./webpack/client.development.config.js')

const serverBundle = webpack(serverWebpackConfig)
const clientBundle = webpack(clientWebpackConfig)

const logger = console.log
const emptyFunc = () => null

const buildLogger = done => (err, stats) => {
  if (err) { logger('Error', err) }
  else {
    logger(stats.toString({ chunks: false, colors: true }))
    done()
  }
}

const watchLogger = done => (err, stats) => {
  if (err) { logger('Error', err) }
  else {
    logger(stats.toString({ chunks: false, colors: true }))
    done()
    // nodemon.restart()
  }
}

gulp.task('clean-bundle', done =>
  del([
    serverWebpackConfig.output.path + '/**.js',
    clientWebpackConfig.output.path + '/**',
  ])
)

gulp.task('server-bundle', done =>
  serverBundle.run(buildLogger(done))
)

gulp.task('client-bundle', done =>
  clientBundle.run(buildLogger(done))
)

gulp.task('bundle', ['server-bundle', 'client-bundle'])

gulp.task('server-bundle-watch', done =>
  serverBundle.watch(100, watchLogger(done))
)

gulp.task('client-bundle-watch', done =>
  clientBundle.watch(100, watchLogger(done))
)

gulp.task('run', ['clean-bundle', 'server-bundle', 'client-bundle'], () => {
  nodemon({
    script: './server',
    ext: 'js json vue less css png eot svg ttf woff',
    ignore: [
      'webroot/*',
      '*.test.*',
      'tests/*',
      '*.spec.*',
      'resources/*',
      'bootstrap/*',
      'server/templates/assets.json',
      'client/bundles/*',
    ],
    watch: ['./server', './client'],
  }).on('start', () => logger('Main process started. watching...'))
    .on('crash', () => logger('Main process crashed.'))
    .on('quit', () => process.exit())
    .on('restart', files => {
      serverBundle.run(buildLogger(emptyFunc))
      clientBundle.run(buildLogger(emptyFunc))

      if (files) {
        files = files.map(file => {
          const _file = path.relative(process.cwd(), file)
          return _file.indexOf('..') === 0 ? file : _file
        })
        if (files.length) files = files[0]
      }
      logger({ changed: files }, 'Main process is going to restart...')
    })
    .on('config:update', config => {
      config = config || {}
      const options = config.options || {}
      logger('Nodemon configured.')
      logger('输入`' + (options.restartable || 'rs') + '\'回车以手动重启进程')
    })
})
