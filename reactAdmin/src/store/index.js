/*
 * @Author: nxl 
 * @Date: 2018-09-21 11:33:43 
 * @Last Modified by: nxl
 * @Last Modified time: 2018-09-21 13:53:17
 */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
// redux 日志
import logger from 'redux-logger'
import reducer from './reducer'
import * as actionCreator from './actionCreator'


// 挂载 redux 浏览器插件
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, logger),
  // other store enhancers if any
)

const store = createStore(reducer, enhancer)

export default store 

