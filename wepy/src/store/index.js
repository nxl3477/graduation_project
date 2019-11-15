// 创建store ,  处理中间件
import { createStore, applyMiddleware } from 'redux'
// promise 异步解决方案
import promiseMiddleware from 'redux-promise'
// 获取合并后的rootReducer
import rootReducer from './reducers'

// 获取到所有action
import actions from './actions'
import * as types from './types'

const configStore = ()=> {
  const store = createStore(rootReducer, applyMiddleware(promiseMiddleware))
  return store
}


export { configStore, actions, types }