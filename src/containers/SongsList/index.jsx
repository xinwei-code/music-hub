import { connect } from 'react-redux'
import { message } from 'antd'

//ui组件
import SongsList from '../../pages/SongsList'
//引入actions
import { play } from '../../redux/actions/song'
import { getSongUrl } from '../../Api/songs'

function SongList(props) {
  //获取音乐信息
  const getSongInfo = async song => {
    const { data } = await getSongUrl(song.id)
    if (data[0].url) {
      // 将音乐名和url地址存入sessionStorage
      sessionStorage.setItem('musicName', song.name)
      sessionStorage.setItem('musicUrl', data[0].url)
      props.play({ musicUrl: data[0].url, musicName: song.name })
    } else {
      return message.error('无版权')
    }
  }
  return <SongsList getSongInfo={getSongInfo} />
}

export default connect(state => ({ song: state.song }), {
  play,
})(SongList)
