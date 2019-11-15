const { pageInit, baseUrl } = require('./util')
const { fontTypeScript, videoTypeScript } = require('./html')
const DB = require('../../mysql')


const objAssignBy = (array = [], gist) => array.reduce((prev, next, index, origin) =>{
  let temp = prev[next[gist]]
  prev[next[gist]] = temp ? Object.assign( temp, next) : next
  return prev
}, {})

/**
 * 负责从首页获取所有类型
 *
 * @returns
 */
module.exports = async () => {
  const url = baseUrl
  // // 创建一个页面
  const toutiaoPage = await pageInit(url)
  let articleInfo = await toutiaoPage.evaluate(fontTypeScript)
  const xiguaPage = await pageInit('http://m.ixigua.com/')
  const videoInfo = await xiguaPage.evaluate(videoTypeScript)
  
  let mergeArr = objAssignBy([...articleInfo, ...videoInfo], 'type_name')
  let result = Object.keys(mergeArr).map((key) => mergeArr[key])
  await DB('types').insert(result)
  return result
}
