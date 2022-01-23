import { PLAY, PLAYAUDIO, PLAYVIDEO } from '../constance'

// 初始化数据
const initState = {
  musicUrl: sessionStorage.getItem('musicUrl') || '', //播放地址
  musicName: sessionStorage.getItem('musicName') || '', //歌曲名（用于document.title做展示）
}

//此处的reducer不能是异步的
export default function songListReducer(preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case PLAY: //播放歌曲
      const { musicUrl, musicName } = data
      return { musicUrl, musicName }

    case PLAYAUDIO: //audio播放
      document.title = `▶ ${preState.musicName}`
      return preState

    case PLAYVIDEO: //video播放
      break
    default:
      return preState
  }
}
