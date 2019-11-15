const DB = require('../mysql')

const { public, token } = require('../util')
const _ = require('loadsh')


// ---------- html parse ----------------------

const newVideoParse = () => {
  var soure = document.querySelector('.container .player-wrap video').getAttribute('src')
  var title = document.querySelector('.container .abstract .title').innerText
  var avatar =  document.querySelector('.container .avatar img').getAttribute('src')
  var auther =  document.querySelector('.container .info .name').innerText
  var open_times = document.querySelector('.container .info .num em').innerText
  return {
    soure,
    title,
    avatar,
    auther,
    open_times
  }
}


const newFontParse = () => {
  var body = document.querySelector('.article .article__content').innerHTML
  var title = document.querySelector('.article .article__title').innerText
  var avatar =  document.querySelector('.article .article__author img').getAttribute('src')
  var auther =  document.querySelector('.article .article__author .author-name').innerText
  var open_times = 0
  body = body.replace(/<[^>]+>/gi, '')
  return {
    body,
    title,
    avatar,
    auther,
    open_times
  }
}


const saveBlog = async ({ openid, group_id, mode, auther, create_time, title }) => {
  if(title){
    await DB('blogs').insert({ openid, group_id, mode, auther, create_time, title })
  }
  
}



const get = async (ctx, next) => {
  const { group_id, mode } = ctx.request.query
  const originToken = ctx.request.header.authorization
  console.log(originToken)
  const { makeBody } = ctx
  let userInfo = null
  let create_time = Math.round(new Date().getTime()/1000) 
  if(originToken){
    userInfo = token.tokenVerify(originToken)
  }

  if(_.isUndefined(group_id) || _.isUndefined(mode)) return ctx.body = makeBody({}, '参数错误', 400)
  
  let newInfo = {}
  // 判断 视频类 和 文字类
  if(mode == 0){
    let detail = await DB.select().from('font_detail').where({group_id})
    if(detail.length == 0){
      const page = await public.fastPage(`https://www.toutiao.com/group/${group_id}`)
      try {
        newInfo = await page.evaluate(newFontParse)
      }catch(e){
        console.log(e)
        ctx.body = makeBody({}, '该文章资源已丢失', 404)
        return
      }
      page.close()
      if(userInfo) saveBlog({ ...userInfo, ...newInfo, create_time, group_id, mode })
      ctx.body = makeBody({...newInfo}, '获取成功')
      return 
    }else{
      detail = detail[0]
      detail.body = detail.body.replace(/<[^>]+>/gi, '')
      if(userInfo) saveBlog({ ...userInfo, ...newInfo, create_time, group_id, mode })
      ctx.body = makeBody({...detail}, '获取成功')
      return
    }
    
  }else if(mode == 1){
    // const detail = await DB.select().from('video_detail').where({group_id})
    const page = await public.fastPage(`https://www.ixigua.com/group/${group_id}`, false)
    try {
      newInfo = await page.evaluate(newVideoParse)
    }catch(e){
      ctx.body = makeBody({}, '该视频资源已丢失', 404)
      return
    }
    page.close()
    if(userInfo) saveBlog({ ...userInfo, ...newInfo, create_time, group_id, mode })
    ctx.body = makeBody({...newInfo}, '获取成功')
    return
  }
  
}


module.exports = {
  get
}


