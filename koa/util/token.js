/*
 * @Author: nxl 
 * @Date: 2018-09-27 15:19:23 
 * @Last Modified by: nxl
 * @Last Modified time: 2018-10-16 22:44:12
 */
const jwt = require('jsonwebtoken') 
const jwtKoa = require('koa-jwt')
const { tokenSecret, expiresIn } = require('../config') 

/**
 * 创建 token
 * @param {*} [info] 需要加密的信息
 */
exports.createToken = (info = {}) => jwt.sign(JSON.parse(JSON.stringify(info))  , tokenSecret, { expiresIn })


/**
 * 解析 token 
 * @param {String} token
 */
exports.tokenVerify = (token ={} ) => jwt.verify(token.split(' ')[1],  tokenSecret) 


// 验证token 中间件
exports.jwtKoa = jwtKoa({ secret: tokenSecret }).unless({
  path: [/^\/api\/wx\/.*/, /^\/api\/admin\/login/, /^\/custom\/.*/,  /^\/static\/.*/] //数组中的路径不需要通过jwt验证
})





/**
 * token 审核失败错误处理中间件
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
exports.errorHandle = (ctx, next) => next().catch((err) => {
  if (err.status === 401) {
    ctx.status = 200;
    return ctx.body = {
      status: 601, msg: '请登录', data: []   //这里设置返回的 错误信息
    };
  } else {
    throw err;
  }
});