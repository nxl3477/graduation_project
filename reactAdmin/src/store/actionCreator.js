import axios from 'axios'
import * as c from './constants'
import { sleep } from '../utils/public'



// 存储表单记录
export const setRecord = record => ({ type: c.SET_RECORD, payload: record })
// 改变加载状态
export const changeLoading = isLoading => ({ type: c.CHANGE_ISLOADING, payload: isLoading })
export const changeUserIsLogin = isLogin => ({ type: c.CHANGE_USER_ISLOGIN, payload: isLogin }) 

// 登录或注册授权信息
const accreditAction = userInfo => ({ type: c.ACCREDIT_USER, payload: userInfo })





// react thunk
// 验证身份
export const authCheckAsync = () => {
  
  return async (dispatch) => {
    try{
      const res = await axios.post('/auth')
      if(res.status === 200) {
        dispatch(accreditAction( res.data ))
        dispatch(changeUserIsLogin( true ))
      }else{
        dispatch(changeUserIsLogin( false ))
      }
    } catch(e){
      dispatch(changeUserIsLogin( false ))
    }
  } 
}


// 登录
export const loginActionAsync = (data) => {

  return async (dispatch) => {
    const res = await axios.get('/login', {params: { ...data }})
    if(res.status === 200) {
      localStorage.setItem('token', res.data.token)
      dispatch(accreditAction( res.data ))
      await sleep(1000)
      dispatch(changeUserIsLogin( true ))
    }else{
      dispatch(changeUserIsLogin( false ))
    }
  }
}


// 注册
export const registerActionAsync = (info) => {

  return async (dispatch) => {
    const res = await axios.post('/register', info)
    if ( res.status === 200 ) {
      dispatch(accreditAction( res.data ))
      await sleep(1000)
      dispatch(changeUserIsLogin( false ))
    }
  }
}



// 找回密码
export const forgetActionAsync = (data) => {

  return async (dispatch) => {
    await axios.put('/forget', { ...data })
  }
}




