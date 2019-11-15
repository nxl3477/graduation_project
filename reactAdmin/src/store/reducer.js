import { combineReducers } from 'redux-immutable'
import { fromJS } from 'immutable'
import * as c from './constants'
import { reducer as adminReducer }  from '../pages/Admin/store'
import { reducer as articlesReducer }  from '../pages/Admin/Articles/store'
import { reducer as videosReducer }  from '../pages/Admin/Videos/store'
import { reducer as detailReducer } from '../pages/Admin/Detail/store'
import { reducer as blogsReducer } from '../pages/Admin/Blogs/store'
import { reducer as usersReducer } from '../pages/Admin/Users/store'


const defaultState = fromJS({
  isLoading: false,
  isLogin: true,
  userInfo: { 
    user_name: '',
    user_pwd: '',
    re_user_pwd: '',
    nick_name: '',
    tell: '',
    email: '',
    grade: 0
  },
  autoRecord: {
    user_name: '',
    user_pwd: '',
    nick_name: '',
    email: ''
  }
})

const globalReducer = (state=defaultState, action) => {
  const { type, payload } = action
  switch(type){
    case c.CHANGE_ISLOADING:
      return state.set('isLoading', payload)
    case c.CHANGE_USER_ISLOGIN: 
    return state.set('isLogin', payload)
    case c.ACCREDIT_USER: 
      return state.set('userInfo', fromJS(payload))
    case c.SET_RECORD:
      return state.set('autoRecord', fromJS(payload))
    default:
      return state
  }
}




// 合并reducer
export default combineReducers({
  global: globalReducer,
  admin: adminReducer,
  articles: articlesReducer,
  videos: videosReducer,
  detail: detailReducer,
  blogs: blogsReducer,
  users: usersReducer
})