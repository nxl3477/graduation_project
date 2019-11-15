const request = require('request');
const { public } = require('../util')


/**
 * 请求西瓜视频的评论接口, 返回Promise
 *
 * @param {*} {group_id, offset, count}
 */
const getCmt = ({group_id, offset, count}) => new Promise((resolve, reject) => {
  const url = `https://www.ixigua.com/api/comment/list/?group_id=${group_id}&item_id=${group_id}&offset=${offset}&count=${count}`
  request(url,  (error, response, body) => {
    if(error){
      reject(error)
    }else{
      resolve(body)
    }
  });
})



const get = async (ctx, next) => {
  const params = ctx.request.query
  let result = await getCmt(params)
  result = JSON.parse(result)
  // 整理数据格式
  if(Array.isArray(result.data.comments)){
    result.data.comments = result.data.comments.map((item, index) => {
      item.text = item.text.replace(/<.*\/.+>/gi, '')
      item.create_time = public.timeParse(item.create_time)
      return item
    })
  }
  ctx.body = ctx.makeBody(result.data, '查询成功')
}

module.exports = {
  get
}