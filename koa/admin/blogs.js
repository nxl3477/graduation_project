const DB = require('../mysql')
const { publicPut, publicDel } = require('../util/admin')
const tableName = 'blogs'

const get = async (ctx, next) => {
  const { count } = ctx.request.query
  const res = await DB.select().from(tableName).limit(+count)
  ctx.body = ctx.makeBody(res)
}


const post = async (ctx, next) => {

}


const put = async (...args) => tableName(...args, tableName)

const del = async (...args) => publicDel(...args, tableName)


module.exports = {
  get,
  post,
  put,
  del
}