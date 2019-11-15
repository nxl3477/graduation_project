const DB = require('../mysql')
const _ = require('loadsh')
const { publicPut, publicDel } = require('../util/admin')
const tableName = 'types'

const sleep = (time) => new Promise( (resolved, rejected)=> {
  setTimeout(()=>{
    resolved(true)
  }, time)
})


const get = async (ctx, next) => {
  const { count } = ctx.request.query
  const res = await DB.select().from(tableName).limit(+count)
  ctx.body = ctx.makeBody(res, '分类信息获取成功')
}

const post = async (ctx, next) => {
  // const data = JSON.parse(ctx.request.body.data)
  // const res = await DB.insert({...data})
}

const put = async (...args) => publicPut(...args, tableName)

const del = async (...args) => publicDel(...args, tableName)


module.exports = {
  get,
  post,
  put,
  del
}