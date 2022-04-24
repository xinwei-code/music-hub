//此文件用于暴露一个store对象，整个应用只有一个store对象
import { legacy_createStore as createStore } from 'redux'

//devTool
import { composeWithDevTools } from 'redux-devtools-extension'

//引入总的reducer
import AllReducers from './reducers'

//暴露store
export default createStore(AllReducers, composeWithDevTools())
