import axios from 'axios'
import * as c from './constants'


// 保存类别列表 
export const saveUsersList = usersList => ({ type : c.SAVA_USERS_LIST, payload: { usersList }})

// 删除这个类别
export const deleteUserCreater = id => ({ type: c.DELETE_USERS_LIST, payload: {id} })


// ----- sync thunk --------
// 创建改变名字
export const getUsers = () => {
  return async (dispatch) => {
    const res = await axios.get('/users')
    dispatch(saveUsersList(res.data))
  }
}

export const deleteThisUser = (id) => {
  return async (dispatch) => {
    const res = await axios.delete('/users', {data:{id}})
    if(res.status === 200) dispatch(deleteUserCreater(id))
  }
}