import { fromJS } from 'immutable'
import * as c from './constants'
const defaultState = fromJS({
  videosList: []
})





export default (state=defaultState, action={}) => {
  const { type, payload } = action
  
  // 更新 被修改的typesList
  const operaVideosList = (type='update') => {
    const origin = state.get('videosList').toJS()
    const currId = action.payload.id
    const index = origin.findIndex(item => item.id === currId )
    switch(type){
      case 'update':
        origin.splice(index, 1, action.payload)
        break;
      case 'delete':
        origin.splice(index, 1)
        break;
    }
    return state.set('videosList', fromJS(origin))
  }



  switch (type) {
    case c.SAVA_VIDEO_LIST:
      return state.merge({...payload})
    case c.UPDATE_VIDEO_LIST:
      return operaVideosList('update')
    case c.DELETE_VIDEO_LIST:
      return operaVideosList('delete')
    default:
      return state
  }
}

