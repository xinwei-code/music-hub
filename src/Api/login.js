/* 
login接口
*/

import request from '../utils/request'

//通过电话号码登录
export const loginByCellphone = (username, password) => {
  return request({
    url: '/login/cellphone',
    params: {
      phone: username,
      password: password,
    },
  })
}
