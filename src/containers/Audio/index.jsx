import React, { Fragment } from 'react'
import { connect } from 'react-redux'

//actions
import { playAudio } from '../../redux/actions/song'

const Audio = props => {
  const { songList } = props
  //歌曲播放
  const play = () => {
    // console.log(songList)
    props.playAudio()
  }
  //音乐暂停
  const pause = () => {
    document.title = 'MusicHub'
  }
  return (
    <Fragment>
      <audio
        controls
        className="audio-control"
        onPlay={play}
        onPause={pause}
        autoPlay
        src={songList.musicUrl ? songList.musicUrl : ''}
      />
    </Fragment>
  )
}

export default connect(
  state => {
    // console.log(state)
    return { songList: state.song }
  },
  {
    playAudio,
  }
)(Audio)
