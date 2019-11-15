// 优化 reducer的插件
import { handleActions } from 'redux-actions'
import { home } from '../types'



const { HOME_CHANGE_KIND, HOME_STATUS_HEIGHT, SET_TYPE_TRACK, SET_TYPE_POS, SET_CUR_DETAIL, SAVE_TYPES } = home


//  { 方法 }, { 默认值 } 
export default handleActions({
  // 更改 菜单
  [HOME_CHANGE_KIND] (state, action) {
    return {
      ...state,
      kindId: action.payload.kindId
    }
  },
  [SET_TYPE_POS](state, action){
    return {
      ...state,
      scrollPos: action.payload
    }
  },
  [HOME_STATUS_HEIGHT] (state, action) {
    return {
      ...state,
      statusBarHeight: action.payload.statusBarHeight
    }
  },
  [SET_TYPE_TRACK] (state, action){
    return {
      ...state,
      typeTrack: {...state.typeTrack, ...action.payload}
    }
  },
  [SET_CUR_DETAIL] (state, action){
    return {
      ...state,
      ...action.payload
    }
  },
  [SAVE_TYPES] (state, action){
    return {
      ...state,
      types: action.payload
    }
  }
 
}, {
  kindId: 0,
  scrollPos: 0,
  statusHeight: 20,
  // 已看过的类别,防止不必要的加载
  typeTrack: {},
  curDetail: {},
  curCmts: [{}],
  types: [{}]
})