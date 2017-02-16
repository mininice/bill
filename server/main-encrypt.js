// https

import Koa from 'koa'
import path from 'path'
import http from 'http'
import https from 'spdy'
import chalk from 'chalk'
import serve from 'koa-static'
import logger from 'koa-logger'
import config from '@server/config'
import recipes from 'app-proto-recipes'

// @see https://git.daplie.com/Daplie/greenlock-koa
import letsencrypt from 'letsencrypt-express'

config.env = process.env.NODE_ENV || 'development'
const host = 'http://127.0.0.1'
const lePort = 443
const port = process.env.PORT || config.port
const url = `${host}:${port}`

const app = new Koa()
app.keys = ['app-proto']
app.use(serve('webroot'))
app.use(logger())
recipes(app, config)

const le = letsencrypt.create({
  server: 'staging', // in production use 'https://acme-v01.api.letsencrypt.org/directory'
  configDir: path.resolve(__dirname, '..', 'letsencrypt/etc'),
  approveDomains: (opts, certs, cb) => {
    opts.domains = certs && certs.altnames || opts.domains
    opts.email = 'ia.fe@meituan.com' // CHANGE ME
    opts.agreeTos = true
    cb(null, { options: opts, certs })
  },
  debug: true,
})

const server = https.createServer(le.httpsOptions, le.middleware(app.callback()))

server.listen(lePort)

const redirectHttps = (new Koa()).use(require('koa-sslify')()).callback()

http.createServer(le.middleware(redirectHttps))
  .listen(port, () => setTimeout(() => {
    console.log(`
    --------------------------------------------------------------------------------------
      app-proto server listening on ${chalk.magenta.bold(port)}, visit ${chalk.green.underline.bold(url)} to check awesome!
    --------------------------------------------------------------------------------------
    `)
  }, 1000))
