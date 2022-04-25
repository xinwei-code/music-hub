import { message } from 'antd'
import { useDispatch } from 'react-redux'

import { play } from '../redux/actions/song'
import { getSongUrl } from '../Api/songs'

export default function usePlaySong() {
  const dispatch = useDispatch()
  return async function (song) {
    const { data } = await getSongUrl(song.id)
    if (data[0].url) {
      // 将音乐名和url地址存入sessionStorage
      sessionStorage.setItem('musicName', song.name)
      sessionStorage.setItem('musicUrl', data[0].url)
      dispatch(play({ musicUrl: data[0].url, musicName: song.name }))
    } else {
      return message.error('无版权')
    }
  }
}
