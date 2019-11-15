const cp = require('child_process');
const { resolve } = require('path')



const timingSpider = async () => {
  // 声明一个子进程,  并传入一个参数, 这里为数组
  const list = cp.fork(resolve(__dirname, './spider'), {
    // silent: true  // 开启则不接受子进程数据
  })
  const loop = () => {
    setTimeout( async () => {
      await list.send({action: 'start'})
      // loop()
    }, 2000)
    // 86400000
  }
  loop()
  list.on('message', (m)=>{
    const myDate = new Date();
    console.log(`--------${myDate.getMonth() + 1}月${myDate.getDate() } , 任务完成--------`)
  })
}


  
 
module.exports = {
  timingSpider
}