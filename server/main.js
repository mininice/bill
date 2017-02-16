import Koa from 'koa'
import http from 'http'
import recipes from 'app-proto-recipes'
import config from '@server/config'

config.env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || config.port

const app = new Koa()
app.keys = ['app-proto']


var dbMysql = require('koa-mysql-sequelize');
var path = require('path');

var modelPath = path.join(process.cwd(), 'server/model');//指定DAO model存放的目录
var dbConfig = {
    //初始化参数
    database: 'bill',
    username: 'bill',
    password: '123465',
    options: {
        host: '43.241.238.151',
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

http.createServer(app.callback()).listen(port)
