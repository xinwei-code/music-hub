import { connect } from 'react-redux'

import { message } from 'antd'

import Songs from '../../pages/Songs'
import { getSongUrl } from '../../Api/songs'
import { play } from '../../redux/actions/song'

export default connect(state => ({ songlist: state.songlist }), { play })(
  props => {
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
    return <Songs getSongInfo={getSongInfo}></Songs>
  }
)
