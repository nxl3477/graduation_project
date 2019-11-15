const { pageInit } = require('./util')
const { fontDetailScript, videoDetailScript } = require('./html')
const DB = require('../../mysql')


/**
 * 获取内容页数据
 * @param {String} id 该内容页面的Id
 * @returns
 */
module.exports = async ({ mode, group_id, item_id }) => {
  let result = []
  let table = ''
  try{
    if( mode == 0) {
      const page = await pageInit(`https://www.toutiao.com/i${group_id}/`)
      result = await page.evaluate(fontDetailScript)
      table = 'font_detail'
    }else if( mode == 1 ){
      const page = await pageInit(`https://www.ixigua.com/group/${group_id}/`, false)
      result = await page.evaluate(videoDetailScript)
      table = 'video_detail'
    }
    if(result.avatar && result.title){
      console.log('------------该数据符合条件------------------')
      await DB(table).insert({...result, group_id, item_id})
    }else{
      console.log('-----------------该数据不符合条件---------------------')
    }
  }catch(e){
    console.log(`爬取详情出错,错误为: => ${e}`)
  }
  
  console.log(`当前detail, mode=${mode} , 数据为=>`, {...result, group_id, item_id})
  
  return result
}

