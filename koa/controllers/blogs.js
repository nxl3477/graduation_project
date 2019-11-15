const DB = require('../mysql')
const { public, token } = require('../util')

const get = async (ctx, next)=> {
  const originToken = ctx.request.header.authorization
  
  if(originToken){
    const { openid } = token.tokenVerify(originToken)
    let record = await DB.select().where('openid', openid).orderBy('create_time', 'desc').limit(40).from('blogs')
    if(record.length > 0){
      record = record.map( item => {
        item.create_time = public.timeParse(item.create_time) 
        return item
      })
    }
    ctx.body = ctx.makeBody(record, '查询成功')

  }else{
    
  }
}


module.exports = {
  get
}