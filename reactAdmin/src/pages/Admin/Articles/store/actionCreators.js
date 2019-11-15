import axios from 'axios'
import * as c from './constants'


// 保存类别列表 
export const saveArticlesList = articlesList => ({ type : c.SAVA_ARTICLE_LIST, payload: { articlesList }})
// 更新这个类别
export const updateArticlesList = newType => ({ type: c.UPDATE_ARTICLE_LIST, payload: newType })
// 删除这个类别
export const deleteArticlesCreater = id => ({ type: c.DELETE_ARTICLE_LIST, payload: {id} })



// 创建改变名字
export const getArticles = () => {
  return async (dispatch) => {
    const res = await axios.get('/falls?mode=0')
    dispatch(saveArticlesList(res.data))
  }
}

// 更新这个文章
export const updateThisArticle = (data) => {
  return async (dispatch) => {
    const res = await axios.put('/falls', {...data})
    if(res.status === 200) dispatch(updateArticlesList(res.data[0]))
  }
}

export const deleteThisArticle = (id) => {
  return async (dispatch) => {
    const res = await axios.delete('/falls', {data:{id}})
    if(res.status === 200) dispatch(deleteArticlesCreater(id))
  }
}