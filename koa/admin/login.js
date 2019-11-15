const _ = require('loadsh')
const md5 = require('md5');
const DB = require('../mysql')
const { getNow } = require('../util/public')
const { createToken } = require('../util/token')
const { signRules } = require('../config/rules')
const tableName = 'admin_user'
const blogTable = 'admin_blog'



const md5Factory = password => md5(md5(md5(password)))



/**
 * 循环正则自动匹配
 *
 * @param {*} item
 * @returns true 表示核验失败 false为核验通过
 */
const catchFormLack = ctx => {
  const allInfo = ctx.request.body
  const { makeBody } = ctx
  let flag = null
  signRules.every(item =>{
    const { title, key, size, match } = item
    const _this = allInfo[key]
    // 判断非空
    if(_.isUndefined(_this)) return (flag = makeBody( null, `请输入${title}`, 400) ) && false 
    // 判断长度
    const len = _this.length
    if( !_.isUndefined(size) && ( len < size[0] || len > size[1] )) return (
      flag = makeBody(null,`${title}应为${size[0]}-${size[1]}个字符`, 400)) && false
    
    // 正则匹配
    const { regex, msg } = match
    if( !regex.test(_this) ) return (flag = makeBody(!regex.test(_this), msg, 400)) && false 
    return true
  })
  if(flag) ctx.body = flag
  return !!flag
}









// 用户登录
const get = async (ctx, next) => {
  let action = '登录失败', Cap = 6
  let { user_name, user_pwd } = ctx.request.query
  const { makeBody } = ctx
  const create_time = getNow()
  const ip = ctx.ip
  const yesterDay = create_time - ( 1 * 60 * 24 )
  // 检测账号是否正在冻结中
  const [ checkFreeze ] = await DB.select().count().where({ action, ip, user_name }).where('create_time', '>' , yesterDay).from(blogTable)
  // 查询冻结
  const remainDegree = Cap - checkFreeze['count(*)']
  if( remainDegree <= 0 ) return ctx.body = makeBody(null, '该账号已被冻结，请于24小时后重试', 602)
  // md5加密
  user_pwd = md5Factory(user_pwd)
  // 查询登录是否成功
  const info = await DB.select('id', 'user_name', 'avatar', 'grade', 'tell','email', 'nick_name').where({ user_name, user_pwd }).from(tableName)
  let loginIsSuc = !!info.length
  action = loginIsSuc ? '登录成功' : '登录失败'
  // 如果已被冻结则 无需继续增加
  if( !loginIsSuc && remainDegree > 0 ) {
    await DB(blogTable).insert({ user_name, create_time, action, ip })
  }else {
    await DB(blogTable).insert({ user_name, create_time, action, ip })
  }
  const userInfo = info[0]
  const token = createToken(userInfo)
  const result = { token, userInfo }
  return ctx.body = loginIsSuc ? makeBody(result , '登录成功') : makeBody(null, `登录失败, 今日剩余${remainDegree}次机会`, 400)
}

// 用户注册
const post = async (ctx, next) => {
  const allInfo = ctx.request.body
  const { makeBody } = ctx
  let { user_name, user_pwd, re_user_pwd, tell, email, nick_name, grade } = allInfo
  // 表单验证, 抓到不规范返回true
  if( catchFormLack(ctx) ) return false
  if( user_pwd !== re_user_pwd ) return ctx.body = makeBody(null, '两次密码不正确', 400)
  // 用户名是否存在
  const hasUser = await DB.select().where({ user_name }).from(tableName)
  if(hasUser.length) return ctx.body = makeBody(null, '该用户已被注册', 400)
  // 邮箱是否存在
  const hasEmail = await DB.select().where({ email }).from(tableName)
  if(hasEmail.length) return ctx.body = makeBody(null, '该邮箱已被使用', 400)
  // 手机号是否存在 拆离到发送验证码的地方
  const hasTell = await DB.select().where({ tell }).from(tableName)
  if(hasTell.length) return ctx.body = makeBody(null, '该手机号已被使用', 400)
  // 创建时间戳
  const create_time = getNow()
  // 写入数据库
  user_pwd = md5Factory(user_pwd)
  const [ id ] = await DB(tableName).insert({ user_name, user_pwd, tell, email, nick_name, grade, create_time})
  // 立即查找该用户
  const userInfo = await DB.select('id', 'user_name', 'avatar', 'grade', 'tell','email', 'nick_name').where({ id }).from(tableName)
  
  ctx.body = userInfo.length ?  makeBody(userInfo[0], '注册成功') : makeBody(userInfo, '系统错误, 注册失败', 500)
} 


const put = async (ctx, next) => {
  const allInfo = ctx.request.body
  const { makeBody } = ctx
  let { user_name, tell, user_pwd, email } = allInfo

  if ( _.isUndefined(user_name) || _.isUndefined(tell) || _.isUndefined(user_pwd) ) return ctx.body = makeBody( null, '请完善信息', 400)

  // 判断手机号和用户名是否存在 以及正确
  const hasUser = await DB.select().where({user_name, tell, email}).from(tableName)
  if(!hasUser.length) return ctx.body = makeBody(null, '请检查信息，重新输入', 400)
  // 更改密码
  user_pwd = md5Factory(user_pwd)
  const sucRow = await DB(tableName).where({user_name, tell}).update({ user_pwd })
  ctx.body = sucRow === 0 ? makeBody(null, '找回失败', 400) : makeBody(null, '找回成功', 200)
}




module.exports = {
  get,
  post,
  put
}


