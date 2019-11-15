import axios from 'axios'
import * as c from './constants'


// 保存类别列表 
export const saveVideosList = videosList => ({ type : c.SAVA_VIDEO_LIST, payload: { videosList }})
// 更新这个类别
export const updateVideosList = newType => ({ type: c.UPDATE_VIDEO_LIST, payload: newType })
// 删除这个类别
export const deleteVideosCreater = id => ({ type: c.DELETE_VIDEO_LIST, payload: {id} })



// 创建改变名字
export const getVideos = () => {
  return async (dispatch) => {
    const res = await axios.get('/falls?mode=1')
    console.log('res', res)
    dispatch(saveVideosList(res.data))
  }
}

// 更新这个文章
export const updateThisVideo = (data) => {
  return async (dispatch) => {
    const res = await axios.put('/falls', {...data})
    if(res.status === 200) dispatch(updateVideosList(res.data[0]))
  }
}

export const deleteThisVideo = (id) => {
  return async (dispatch) => {
    const res = await axios.delete('/falls', {data:{id}})
    if(res.status === 200) dispatch(deleteVideosCreater(id))
  }
}