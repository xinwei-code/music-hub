/* 
推荐页面接口
*/

import request from '../utils/request'

//歌单介绍接口
export const getDescription = (limit = 1, tag = '全部') => {
  return request({
    url: '/top/playlist/highquality',
    params: {
      limit,
      cat: tag,
    },
  })
}

//歌单列表接口
export const getPlayList = (tag = '全部', limit, currentPage) => {
  return request({
    url: '/top/playlist/',
    params: {
      limit,
      offset: (currentPage - 1) * 12,
      cat: tag,
    },
  })
}
