import { fromJS } from 'immutable'
import * as c from './constants'
const defaultState = fromJS({
  blogsList: [{}]
})





export default (state=defaultState, action={}) => {
  const { type, payload } = action
  
  // 更新 被修改的typesList
  const operaBlogsList = (type='update') => {
    const origin = state.get('blogsList').toJS()
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
    return state.set('blogsList', fromJS(origin))
  }



  switch (type) {
    case c.SAVA_BLOGS_LIST:
      return state.merge({...payload})
    case c.UPDATE_BLOGS_LIST:
      return operaBlogsList('update')
    case c.DELETE_BLOGS_LIST:
      return operaBlogsList('delete')
    default:
      return state
  }


  
}

