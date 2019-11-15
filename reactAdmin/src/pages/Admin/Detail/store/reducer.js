import { fromJS } from 'immutable'
import * as c from './constants'
const defaultState = fromJS({
  article: {},
  video: {}
})



export default (state=defaultState, action) => {
  const { type, payload } = action
  switch(type){
    case c.SAVE_ARTICLE_DETAIL:
      return state.set('article', fromJS(payload))
    case c.SAVE_VIDEO_DETAIL:
      return state.set('video', fromJS(payload))
    default:
      return state
  }
}

