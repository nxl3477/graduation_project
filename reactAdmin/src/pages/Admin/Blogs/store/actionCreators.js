import axios from 'axios'
import * as c from './constants'


// 保存类别列表 
export const saveBlogsList = blogsList => ({ type : c.SAVA_BLOGS_LIST, payload: { blogsList }})

// 删除这个类别
export const deleteBlogCreater = id => ({ type: c.DELETE_BLOGS_LIST, payload: {id} })


// ----- sync thunk --------
// 创建改变名字
export const getBlogs = () => {
  return async (dispatch) => {
    const res = await axios.get('/blogs')
    dispatch(saveBlogsList(res.data))
  }
}

export const deleteThisBlog = (id) => {
  return async (dispatch) => {
    const res = await axios.delete('/blogs', {data:{id}})
    if(res.status === 200) dispatch(deleteBlogCreater(id))
  }
}