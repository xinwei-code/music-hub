/* 
获取歌曲（20条）
*/

import request from '../utils/request'

//通过歌曲类型获取热门歌曲
export const getSongs = type => {
  return request({
    url: '/top/song',
    params: {
      type,
    },
  })
}

//获取歌曲列表
export const getSongsList = id => {
  return request({
    url: '/playlist/detail',
    params: {
      id,
    },
  })
}

//根据歌曲id获取歌曲信息
export const getSongUrl = id => {
  return request({
    url: 'song/url',
    params: { id },
  })
}
