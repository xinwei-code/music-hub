import request from './request'

//根据关键字搜索歌曲
export const getSearchResult = (searchVal, type = 1, page = 1, limit = 10) => {
  return request({
    url: '/search',
    params: {
      keywords: searchVal,
      limit: limit,
      type: type,
      offset: (page - 1) * 10,
    },
  })
}
