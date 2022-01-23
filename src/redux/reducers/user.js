import { LOGIN, LOGOUT } from '../constance'
import PubSub from 'pubsub-js'

//初始化数据
const initState = {
  //用户的token
  token: sessionStorage.getItem('token') || '',
  //用户信息
  userInfo: JSON.parse(sessionStorage.getItem('userInfo') || '{}'),
  //是否处于登录状态
  isLogin: sessionStorage.getItem('isLogin') || false,
}

export default function userReducer(preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case LOGIN:
      if (data) {
        //登录
        //保存token
        sessionStorage.setItem('token', data.token)
        //修改登录状态为true
        preState.isLogin = true
        sessionStorage.setItem('isLogin', true)
        // 保存用户信息
        preState.userInfo = data.profile
        sessionStorage.setItem('userInfo', JSON.stringify(data.profile))
        //登陆成功后跳转到首页
        console.log('登录成功。')
        //发布消息
        PubSub.publish('profile', { ...preState })
      } else {
        //发布消息
        PubSub.publish('profile', { ...preState })
      }
      return preState

    case LOGOUT: //退出登录
      return preState

    default:
      return preState
  }
}
