import { PLAY, PLAYAUDIO, PLAYVIDEO } from '../constance'

// 同步reducer
export const play = data => ({ type: PLAY, data })
export const playAudio = data => ({ type: PLAYAUDIO, data })
export const playVideo = data => ({ type: PLAYVIDEO, data })
