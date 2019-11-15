import { fromJS } from 'immutable'
import * as c from './constants'
const defaultState = fromJS({
  typesList: [{}]
})





export default (state=defaultState, action={}) => {
  const { type, payload } = action
  
  // 更新 被修改的typesList
  const operaTypesList = (type='update') => {
    const origin = state.get('typesList').toJS()
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
    return state.set('typesList', fromJS(origin))
  }



  switch (type) {
    case c.SAVA_TYPES_LIST:
      return state.merge({...payload})
    case c.UPDATE_TYPES_LIST:
      return operaTypesList('update')
    case c.DELETE_TYPES_LIST:
      return operaTypesList('delete')
    default:
      return state
  }


  
}

