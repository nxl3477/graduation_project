import axios from 'axios'
import * as c from './constants'

export const saveCurVideoDetail = videoDetail => ({ type: c.SAVE_VIDEO_DETAIL, payload: videoDetail })

export const saveCurArticleDetail = articleDetail => ({ type: c.SAVE_ARTICLE_DETAIL, payload: articleDetail })


//  async thunk
export const getVideoDetail = group_id => {
  
  return async (dispatch) => {
    dispatch(saveCurVideoDetail({}))
    const res = await axios.get('/video', {params: { group_id }})
    if(res.status === 200 ){
      dispatch(saveCurVideoDetail(res.data))
    }
    
  }
}


export const getArticleDetail = group_id => {
  
  return async (dispatch) => {
    dispatch(saveCurVideoDetail({}))
    const res = await axios.get('/article', {params: { group_id }})
    if( res.status === 200 ){
      dispatch(saveCurArticleDetail(res.data))
    }
  }
}