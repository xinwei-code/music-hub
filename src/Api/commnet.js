import request from '../utils/request'
// 获取最热评论
export const getHotComment = paramsObj => {
  return request({
    url: '/comment/hot',
    params: {
      id: paramsObj.id,
      limit: paramsObj.limit,
      type: paramsObj.type,
      offset: (paramsObj.offset - 1) * 10,
    },
  })
}

// 获取最新评论
export const getNewComment = paramsObj => {
  return request({
    url: '/comment/playlist',
    params: {
      id: paramsObj.id,
      limit: paramsObj.limit,
      offset: (paramsObj.offset - 1) * 10,
    },
  })
}
