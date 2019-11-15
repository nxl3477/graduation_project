const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors');


exports.getNow = () => (~~ (+new Date()/1000))



/**
 * 响应数据格式化
 * @param {*} 返回的数据
 * @param {string} 相应信息
 * @param {number} 操作状态码
 */
exports.makeBody = async (ctx, next) => {
  ctx.makeBody = ( data=[], msg='操作成功', status = 200 ) => ({ status, msg, data })
  await next()
}


/**
 *  创建无等待的 puppeteer 页面
 *  
 * @param {*} url
 * @param {boolean} [ismobil=true]
 * @returns
 */
exports.fastPage = async (url, ismobil=true) => {
  const browser = await puppeteer.launch({
    // 启动非沙箱模式
    args: ['--no-shadbox'],
    dumpio: false
  })
  // 创建一个新页面
  const page = await browser.newPage()

  if(ismobil){
    console.log('------开启移动模式--------------')
    await page.emulate(devices['iPhone X'])  // 以iphonex 模式运行
  }

  // 等待页面加载
  await page.goto(url, {
    // 当网络空闲的时候, 说明网络加载完毕了
    waitUntil: 'networkidle2'
  })
  return page
}




/**
 * 传入时间戳, 计算时间差
 *
 * @param {*} create_time
 * @returns
 */
exports.timeParse = (create_time) => {
  const cur = Math.round(new Date().getTime()/1000) 
  if(!create_time){
    return '未知'
  }
  const diff = cur - create_time
  const d = parseInt(diff / (24 * 60 *60))
  const h = parseInt(diff % (24 * 60 *60) / (60 * 60))
  const m = parseInt(diff % (24 * 60 *60) % (60 * 60) / 60)
  let result = ''
  if(d > 0){
    result = `${d}天前`
  }else if(h > 0){
    result = `${h}小时前`
  }else if(m > 5){
    result = `${m}分钟前`
  }else if( m > 0 && m <= 5 ){
    result = '刚刚'
  }
  return result
}