/* 
个人中心接口
*/

import request from '../utils/request'


//个人主页数据
export const getMyData = (uid) => {
    return request({
      url: '/user/detail',
      params: {
        uid,
      },
    })
}