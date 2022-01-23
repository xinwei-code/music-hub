import { LOGIN, LOGOUT } from '../constance'


export const login = data => ({ type: LOGIN, data })
export const logout = data => ({ type: LOGOUT, data })
