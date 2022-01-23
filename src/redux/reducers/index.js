// 此文件用于汇总所有reducer
import { combineReducers } from 'redux'

//引入为music组件服务的reducer
import song from './song'
import user from './user'

export default combineReducers({
  song,
  user,
})
