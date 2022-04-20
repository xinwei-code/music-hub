import request from '../utils/request'

//获取所有mv
export const getAllMV = (
  area = '全部',
  type = '全部',
  order = '上升最快',
  limit = 8,
  page = 1
) => {
  return request({
    // 获取符合要求的mv数量    这里有个接口小问题，只能第一次调用才有count
    url: '/mv/all',
    params: {
      area,
      type,
      order,
      limit,
      offset: (page - 1) * 8,
    },
  })
}

//获取mv播放地址
export const getMVURL = id => {
  return request({
    url: '/mv/url',
    params: {
      id,
    },
  })
}

//获取推荐mv
export const getRecommendMV = mvid => {
  return request({
    url: '/simi/mv',
    params: {
      mvid,
    },
  })
}

//获取MV的相关信息
export const getInfoAboutMV = mvid => {
  return request({
    url: '/mv/detail',
    params: {
      mvid,
    },
  })
}

//获取歌手信息
export const getSingerInfo = id => {
  return request({
    url: '/artists',
    params: {
      //   接收传来的歌手id
      id,
    },
  })
}

//获取mv评论
export const getCommentOfMv = (id, limit = 20, page = 1) => {
  return request({
    url: '/comment/mv',
    params: {
      //   接收传来的MVid
      id,
      limit,
      offset: (page - 1) * 10,
    },
  })
}
