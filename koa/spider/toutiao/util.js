const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors');
const baseUrl = `https://m.toutiao.com/`

// 设置睡眠
const sleep = time => new Promise(resolve=>{
  setTimeout(resolve, time)
})

/**
 * 创建并返回挂载过Jquery的 Page实例
 * 
 * @param {*} url   需要加载的地址
 * @returns
 */
const pageInit = async (url, dev = true, speed = 3000) => {
    // 创建一个浏览器
  const browser = await puppeteer.launch({
    // headless: true, //默认为true（无头），不显示浏览器界面
    slowMo :200, //减速显示，有时会作为模拟人操作特意减速
    // 启动非沙箱模式
    args: ['--no-shadbox'],
    headless: true,
    dumpio: false
  })
  const page = await browser.newPage()
  if(dev){
    console.log('------开启移动模式--------------')
    await page.emulate(devices['iPhone X'])  // 以iphonex 模式运行
  }
  await page.goto(url, {
    // 当网络空闲的时候, 说明网络加载完毕了
    waitUntil: 'networkidle2'
  })
  try {
    await page.click('.jump')
  }catch(e){
    await sleep(speed)
  }
  
  // 手动注入Jq
  await page.mainFrame()
  .addScriptTag({
    url: 'https://cdn.bootcss.com/jquery/3.3.1/jquery.js'
  })
  await sleep(speed)
  return page
}



module.exports = {
  baseUrl,
  pageInit
}