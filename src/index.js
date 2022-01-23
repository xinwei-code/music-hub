import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
//导入nprogress样式
import '../node_modules/nprogress/nprogress.css'

//引入store
import store from './redux/stroe'
import { Provider } from 'react-redux'

//引入全局样式
import './App.css'

import App from './App'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
