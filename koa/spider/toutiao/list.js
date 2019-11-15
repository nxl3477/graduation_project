const { pageInit, baseUrl } = require('./util')
const { fontListsScript, videoListsScript } = require('./html')
const deatilSpider = require('./detail')
const DB = require('../../mysql')


// 设置睡眠
const sleep = time => new Promise(resolve=>{
  setTimeout(resolve, time)
})

let spiderLoop = async ({url, id, mode}) => {
  const page = await pageInit(url)
  await page.waitFor(3000);
  let result = []
  // 区别出 视频和文字类 头条
  if(mode == 0){
    result = await page.evaluate(fontListsScript)
  }else if(mode == 1){
    result = await page.evaluate(videoListsScript)
  }
  result = result.reduce( (prev, next) => {
    if(next.title){
      prev.push({...next, type_id: id, mode})
    }
    return prev
  }, [])
  if( mode == 0 ){
    // for( var i = 0, len = result.length; i < len; i++){
    //   // 爬取内容页面 
    //   // 挂载上类型
    //   try {
    //     // await deatilSpider({...pack})
    //     await deatilSpider({...result[i]})
    //     await sleep(3000)
    //   }catch(e){
    //     console.log(`爬取内容出现问题: ${e}`)
    //   }
    // }
  }
  
  console.log(`------------mode:${mode}-------------`)
  console.log(result)
  await DB('falls').insert(result)
  console.log(`id为: ${id}, mode: ${mode}==>的爬虫执行完成`)
  page.close()
  return result
}

module.exports = async () => {
  let typesList = await DB.select().from('types')
  let sum = []
  
    for( var i = 0; i< typesList.length; i++ ){
      try{
        var item = typesList[i]
        if(item.article){
          let res = await spiderLoop({ ...item, url: item.article, mode: 0 })
          sum.push(res)
        }
        if(item.video){
          let res = await spiderLoop({ ...item, url: item.video, mode: 1 })
          sum.push(res)
        }
      }catch(e){
        console.log('list', e)
      }
      await sleep(3000)
    }
  return sum
}
  