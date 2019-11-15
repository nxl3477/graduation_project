const _ = require('lodash')
const DB = require('../mysql')
const { publicPut, publicDel } = require('../util/admin')
const { public } = require('../util')
const tableName = 'video_detail'




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




const get = async (ctx, next) => {
  const { group_id } = ctx.request.query
  const { makeBody } = ctx

  if(_.isUndefined(group_id)) return ctx.body = makeBody({}, '参数错误', 400)
  let newInfo = {}

  const page = await public.fastPage(`https://www.ixigua.com/group/${group_id}`, false)
  try {
    newInfo = await page.evaluate(newVideoParse)
  } catch(e){
    return ctx.body = makeBody({}, '该视频资源已丢失', 404)
  }
  page.close()
  return ctx.body = makeBody({...newInfo}, '获取成功')
}



const put = async (...args) => tableName(...args, tableName)

const del = async (...args) => publicDel(...args, tableName)


module.exports = {
  get,
  put,
  del
}