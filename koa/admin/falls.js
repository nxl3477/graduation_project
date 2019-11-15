const DB = require('../mysql')
const _ = require('loadsh')
const { publicPut, publicDel } = require('../util/admin')
const tableName = 'falls'

// 查询列表
const get = async (ctx, next) => {
  const { type_id, count, mode, page=1 } = ctx.request.query
  const { makeBody } = ctx
  const msgs = ['文章', '视频']
  let fallsRes = []
  const [countRes] = await DB.select().count().where({mode}).from(tableName)
  const amount = countRes['count(*)']
  // 判断 页面的上下边界,  做出处理, 返回amount
  if( _.isUndefined(type_id) ){
    fallsRes = await DB.select().from(tableName).where({mode}).orderBy('create_time', 'desc').limit(+count)
  }else {
    fallsRes = await DB.select().from(tableName).where({type_id, mode}).orderBy('create_time', 'desc').limit(+count)
  }

  ctx.body = makeBody(fallsRes, `${msgs[mode]}信息查询成功`)
}


const post = async (ctx, next) => {
  const data = JSON.parse(ctx.request.body.data)
  const { makeBody } = ctx
  // 检查是否缺少参数
  const notNull = ["title", "auther", "type_id", "group_id", "mode", "item_id", "create_time"]
  if( notNull.every( key => !_.isUndefined(data[key])) ){
    const id = await DB(tableName).insert({...data})
    ctx.body = makeBody({ id }, '添加成功')
  }else{
    ctx.body = makeBody(0, '缺少参数', 400)
  }
}


const put = async (...args) => publicPut(...args, tableName)

const del = async (...args) => publicDel(...args, tableName)


module.exports = {
  get,
  post,
  put,
  del
}