import { fromJS } from 'immutable'
import * as c from './constants'
const defaultState = fromJS({
  usersList: [{}]
})





export default (state=defaultState, action={}) => {
  const { type, payload } = action
  
  // 更新 被修改的typesList
  const operaUsersList = (type='update') => {
    const origin = state.get('usersList').toJS()
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
    return state.set('usersList', fromJS(origin))
  }



  switch (type) {
    case c.SAVA_USERS_LIST:
      return state.merge({...payload})
    case c.UPDATE_USERS_LIST:
      return operaUsersList('update')
    case c.DELETE_USERS_LIST:
      return operaUsersList('delete')
    default:
      return state
  }


  
}

