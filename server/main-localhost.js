import Koa from 'koa'
import http from 'http'
import chalk from 'chalk'
import serve from 'koa-static'
import logger from 'koa-logger'
import config from '@server/config'
import recipes from 'app-proto-recipes'



config.env = process.env.NODE_ENV || 'development'
const host = 'http://127.0.0.1'
const port = process.env.PORT || config.port
const url = `${host}:${port}`

const app = new Koa()
app.keys = ['app-proto']
app.use(serve('webroot'));
app.use(serve('client/assets'));

app.use(logger())



var dbMysql = require('koa-mysql-sequelize');
var path = require('path');

var modelPath = path.join(process.cwd(), 'server/model');//指定DAO model存放的目录
var dbConfig = {
    //初始化参数
    database: 'bill',
    username: 'bill',
    password: '123465',
    options: {
        //host: '192.168.1.111',
        host: '172.25.121.205',
        port: '3306',
        dialact: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        define: {
            timestamps: false
        }
    }
};
global.DB = new dbMysql.DB(modelPath, dbConfig);



recipes(app, config)

http.createServer(app.callback())
  .listen(port, () => setTimeout(() => {
    console.log(`
    --------------------------------------------------------------------------------------
      app-proto server listening on ${chalk.magenta.bold(port)}, visit ${chalk.green.underline.bold(url)} to check awesome!
    --------------------------------------------------------------------------------------
    `)
  }, 1000))
