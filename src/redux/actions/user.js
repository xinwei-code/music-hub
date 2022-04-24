import { LOGIN, LOGOUT } from '../constance'

//登录
export const login = data => ({ type: LOGIN, data })
//退出登录
export const logout = data => ({ type: LOGOUT, data })
