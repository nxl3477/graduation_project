const DB = require('../mysql')
const { public } = require('../util')
const _ = require('loadsh')
const get = async (ctx, next) => {
  const { type_id, count } = ctx.request.query
  if( _.isUndefined(count) ){
    ctx.body = ctx.state.makeBody([], '参数错误', 400)
    return 
  }
  // .orderByRaw('RAND()') .orderBy('create_time', 'desc')
  const earliest = new Date().getTime() - (1000 * 60 * 24 * 7)
  // .where('create_time','>', earliest )
  let falls = await DB.select().from('falls').where('type_id', (type_id || 143)).orderByRaw('RAND()').limit(+count)
  falls = falls.map( (item) =>{
    item.create_time = public.timeParse(item.create_time)
    if( item.img_holder != '' ) item.img_holder = item.img_holder.split(',')
    return item
  })
  ctx.body = ctx.makeBody(falls, '查询成功')
  
  

  
}





module.exports = {
  get,
  // post
}


