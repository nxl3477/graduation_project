import { fromJS } from 'immutable'
import * as c from './constants'
const defaultState = fromJS({
  articlesList: [{}]
})





export default (state=defaultState, action={}) => {
  const { type, payload } = action
  
  // 更新 被修改的typesList
  const operaArticlesList = (type='update') => {
    const origin = state.get('articlesList').toJS()
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
    return state.set('articlesList', fromJS(origin))
  }



  switch (type) {
    case c.SAVA_ARTICLE_LIST:
      return state.merge({...payload})
    case c.UPDATE_ARTICLE_LIST:
      return operaArticlesList('update')
    case c.DELETE_ARTICLE_LIST:
      return operaArticlesList('delete')
    default:
      return state
  }


  
}

