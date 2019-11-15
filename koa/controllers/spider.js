
const toutiao = require('../spider/toutiao')

const get = async (ctx, next) => {
  const result = await toutiao.list()
  ctx.body = ctx.makeBody({result})
}





// 评论地址
// https://www.toutiao.com/api/comment/list/?group_id=6605852056647369224&item_id=6605852056647369224&offset=11&count=10

module.exports = {
  get
}