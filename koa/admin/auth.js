const { tokenVerify } = require('../util/token')


const post = async (ctx, next) => {
  const { makeBody } = ctx
  let user = ctx.state.user
  if( user ){
    const { exp, iat, ...userInfo } = user
    return ctx.body = makeBody(userInfo, '登录成功')
  }
}


module.exports = {
  post
}