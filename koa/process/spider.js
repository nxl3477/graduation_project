const toutiao = require('../spider/toutiao')
const DB = require('../mysql')
process.on('message', async (m) => {
  if(m.action == 'start'){
    console.log('---------------接到任务--------------')
    // const day2Ms = (day = 0) => day * 86400000 
    // const myDate = new Date().getTime() - day2Ms(3)
    // await DB('falls').where('create_time', '<', myDate).del()
    // console.log('已删除旧数据')
    const result = await toutiao.list()
    await process.send(result)
  }
})
  
// 自我关闭子线程
// process.exit()