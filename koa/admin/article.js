const DB = require('../mysql')
const _ = require('loadsh')
const { publicPut, publicDel } = require('../util/admin')
const { public } = require('../util')
const tableName = 'font_detail'


// 文字解析
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



const get = async (ctx, next) => {
  const { group_id } = ctx.request.query
  const { makeBody } = ctx

  if(_.isUndefined(group_id)) return ctx.body = makeBody({}, '参数错误', 400)
  let newInfo = {}
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
    ctx.body = makeBody({...newInfo}, '获取成功')
    return 
  } else{
    detail = detail[0]
    detail.body = detail.body.replace(/<[^>]+>/gi, '')
    ctx.body = makeBody({...detail}, '获取成功')
    return
  }
}



const put = async (...args) => tableName(...args, tableName)

const del = async (...args) => publicDel(...args, tableName)

module.exports = {
  get,
  put,
  del
}