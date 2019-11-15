const DB = require('../mysql')

const get = async (ctx, next) => {
  const types = await DB.select().from('types')
  ctx.body = ctx.makeBody(types, '查询成功')
}



module.exports = {
  get
}