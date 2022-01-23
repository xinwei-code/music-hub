/* 
Discover接口
*/
import request from './request'

//轮播图接口
export const getSwiper = () => {
  return request({
    url: '/banner',
  })
}

//推荐歌单接口
export const getRecommend = (limit = 5) => {
  return request({
    url: '/personalized',
    params: {
      limit,
    },
  })
}

//最新音乐接口
export const getSongs = (limit = 12) => {
  return request({
    url: '/personalized/newsong',
    params: {
      limit,
    },
  })
}

//最新MV接口
export const getMv = () => {
  return request({
    url: '/personalized/mv',
  })
}
