const DB = require('../mysql')

/** 
 *  公共的 resultful 接口
 * 
*/
exports.publicPut = async (ctx, next, tableName) => {
  const { id, ...data } = ctx.request.body
  const { makeBody } = ctx
  let sucRow = await DB.update({ ...data }).where({ id }).from(tableName)
  let newInfo = await DB.select().where({ id }).from(tableName)
  if(sucRow == 0 ){
    ctx.body = newInfo.length ? makeBody(newInfo, '服务器错误，更新失败', 500) : makeBody(newInfo, '参数错误', 400)
    return false
  } else{
    ctx.body = makeBody(newInfo, '更新成功')
    return false
  }
}

exports.publicDel = async (ctx, next, tableName) => {
  const { id } = ctx.request.body
  const { makeBody } = ctx
  const sucRow = await DB(tableName).where({id}).del()
  ctx.body = sucRow ? makeBody( sucRow, '删除成功') : makeBody( sucRow, '删除失败', 400)
}