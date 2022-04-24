import { LOGIN, LOGOUT } from '../constance'

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
      sessionStorage.setItem('token', data.token)
      sessionStorage.setItem('isLogin', true)
      sessionStorage.setItem('userInfo', JSON.stringify(data.profile))
      return {
        ...preState,
        token: data.token,
        isLogin: true,
        userInfo: data.profile,
      }
    case LOGOUT: //退出登录
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('isLogin')
      sessionStorage.removeItem('userInfo')
      return {
        token: '',
        userInfo: {},
        isLogin: false,
      }
    default:
      return preState
  }
}
