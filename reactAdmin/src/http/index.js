import axios from 'axios'
import { message, Modal } from 'antd';
import { sleep } from '../utils/public'
import store from '../store'
import { changeLoading, changeUserIsLogin } from '../store/actionCreator'
// 配置拦截请求
axios.defaults.baseURL = 'http://localhost:3008/api/admin';
axios.defaults.headers.post['Content-Type'] = 'text/plain';


let loadMsg = null
let counter = 0

const relive = () => {
  if( (--counter <=0 ) && loadMsg ){
    loadMsg()
    loadMsg = null
    counter = 0
  }
}


// 响应拦截，处理一下数据
axios.interceptors.request.use( req => {
  const { method } = req
  req.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
  if( !loadMsg ) loadMsg = message.loading('玩命加载中...', 0)
  switch(method){
    case 'get':
      store.dispatch(changeLoading(true))
      break;
  }
  counter++
  return req 
})

axios.interceptors.response.use( async (res)=>{ 
  const {data} = res
  relive()
  // 避免阻塞
  setTimeout(async ()=>{
    await sleep(500)
    if( data.status === 200 ){
      message.success(data.msg, 2.5)
    }else if(data.status === 404 ){
      Modal.warning({ title: '404', content: data.msg });
    }else{
      message.error(data.msg, 2.5)
    }
    if( data.status === 601 ) store.dispatch(changeUserIsLogin(false))
  }, 0)
  store.dispatch(changeLoading(false))
  return data 
}, (err) => {
  relive()
  return {}
})



export default axios