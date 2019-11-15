import Fly from 'flyio/dist/npm/wx'
const tokenFly=new Fly() // 负责获取token 的请求
const fly = new Fly()

// fly.config = {
//   method:"",//请求方法
//   headers:{},//请求头
//   baseURL:"",//请求基地址
//   parseJson:true,//是否将content-type为“application/json"的响应数据转化为JSON对象，默认为true
//   timeout:"" //超时时间
// }
fly.config.baseURL = `http://localhost:3008/api/wx/`
fly.config.timeout = 60000






// 拦截请求
fly.interceptors.request.use( request =>{
  let userInfo = wx.getStorageSync('userInfo')
  console.log(userInfo)
  request.headers.Authorization = `Bearer ${userInfo.token}` // 挂载 token
  //将request作为promise的最终值 才会继续请求
  return Promise.resolve(request)
})

fly.interceptors.response.use(response => {    
  return Promise.resolve(response.data)
})



export default fly



// fly.interceptors.request.use(function (request) {
//   log(`发起请求：path:${request.url}，baseURL:${request.baseURL}`)
//   if (!csrfToken) {
//     log("没有token，先请求token...");
//     //锁定当天实例，后续请求会在拦截器外排队，详情见后面文档
//     fly.lock();
//     return newFly.get("/token").then((d) => {
//       request.headers["csrfToken"] = csrfToken = d.data.data.token;
//       log("token请求成功，值为: " + d.data.data.token);
//       log(`继续完成请求：path:${request.url}，baseURL:${request.baseURL}`)
//       return request; //只有最终返回request对象时，原来的请求才会继续
//     }).finally(()=>{
//       fly.unlock();//解锁后，会继续发起请求队列中的任务，详情见后面文档
//     })
//   } else {
//     request.headers["csrfToken"] = csrfToken;
//   }
// })