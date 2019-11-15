const { createToken, tokenVerify } = require('../util/token')
const util = require('../util')
const DB = require('../mysql')

// 免费获取token
const get = (ctx, next) => {
  const result = createToken({user: 'a磊'})
  console.log('进来了')
  ctx.body = {
    msg: '拿好你的token',
    result
  }
}

// 获取 token
const post = async (ctx, next) => {
  const { wx, type, token, public  } = util
  const { makeBody } = ctx
  // body 有 code 有用户信息， 但是没有openId
  let { code, ...userInfo } = ctx.request.body
  wxRes = await wx.getOpenId(code)
  userInfo = { ...userInfo, ...wxRes}

  const selectRes = await DB.select().where({openid: userInfo.openid}).from('users')  // 查询是否存在该用户
  if ( type.isArrEmpty(selectRes)){
    await DB('users').insert(userInfo)  // 插入成功返回id [ 11 ]
  } else {
    await DB('users').where('openid', '=', userInfo.openid).update(userInfo)
  }
  
  return ctx.body = makeBody(
    { token: token.createToken({...wxRes})},
    '登录成功'
  )
}

module.exports = {
  get,
  post
}  


// 判断是否存在 token
// let auth = ctx.request.header.authorization
// userInfo.openid = tokenVerify(auth)

