import axios from 'axios'
import * as c from './constants'


// 保存类别列表 
export const saveTypesList = typesList => ({ type : c.SAVA_TYPES_LIST, payload: { typesList }})
// 更新这个类别
export const updateTypesList = newType => ({ type: c.UPDATE_TYPES_LIST, payload: newType })
// 删除这个类别
export const deleteTypeCreater = id => ({ type: c.DELETE_TYPES_LIST, payload: {id} })


// ----- sync thunk --------
// 创建改变名字
export const getTypes = () => {
  return async (dispatch) => {
    console.log('是我请求的')
    const res = await axios.get('/types')
    dispatch(saveTypesList(res.data))
  }
}

// 更新这个类型
export const updateThisType = (data) => {
  return async (dispatch) => {
    const res = await axios.put('/types', {...data})
    if(res.status === 200) dispatch(updateTypesList(res.data[0]))
  }
}

export const deleteThisType = (id) => {
  return async (dispatch) => {
    const res = await axios.delete('/types', {data:{id}})
    if(res.status === 200) dispatch(deleteTypeCreater(id))
  }
}