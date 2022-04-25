import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './index.css'
//actions
import { playAudio } from '../../redux/actions/song'
const Audio = () => {
  const dispatch = useDispatch()
  const songInfo = useSelector(state => {
    return state.song
  })

  //音乐暂停
  const pause = () => {
    document.title = 'MusicHub'
  }

  return (
    <Fragment>
      <audio
        controls
        className="audio-control"
        onPlay={() => dispatch(playAudio())}
        onPause={pause}
        autoPlay
        src={songInfo.musicUrl ? songInfo.musicUrl : ''}
      />
    </Fragment>
  )
}

export default Audio
