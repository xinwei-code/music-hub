export const format = time => {
  time = time / 1000
  const m = (parseInt(time / 60) + '').padStart(2, '0') //转成分
  const s = (parseInt(time % 60) + '').padStart(2, '0') //转成秒
  return m + ':' + s
}

export const getNormalDate = time => {
  const date = new Date(time)
  const y = date.getFullYear() + '-'
  let M = date.getMonth() + 1 + ''
  M = M.padStart(2, '0') + '-'
  let d = date.getDay() + 1 + ''
  d = d.padStart(2, '0') + ' '

  let h = date.getHours() + ''
  h = h.padStart(2, '0') + ':'
  let m = date.getMinutes() + ''
  m = m.padStart(2, '0') + ':'
  let s = date.getSeconds() + ''
  s = s.padStart(2, '0')

  // console.log(y + M + d + h + m + s)
  return y + M + d + h + m + s
}
