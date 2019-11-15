const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const Promise = require("bluebird");
const cors = require('koa-cors');
const static = require('koa-static')
const router = require('./routers')
const path = require('path')
const { public } = require('./util')
const { timingSpider } = require('./process')
const { jwtKoa, errorHandle } = require('./util/token')
global.Promise = Promise
const app = new Koa();
//设置静态资源的路径 
const staticPath = './static'

app
  .use(static(
    path.join( __dirname,  staticPath)
  ))
  .use(cors({
    maxAge: 999
  }))
  .use(bodyParser())
  .use(errorHandle)  // token 错误提示
  .use(jwtKoa)    // 自动检测token
  .use(public.makeBody)
  .use(router.routes())
  .use(router.allowedMethods())
  .use(logger)
 
  // 开启服务
  .listen(3008, ()=> {
    console.log('http://localhost:3008')
  });


;( async () => {
  // timingSpider()
})();
  