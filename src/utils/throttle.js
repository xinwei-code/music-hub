/* 
节流函数（定时器加时间戳实现）
*/
export default function throttle(fn, delay) {
  if (typeof fn !== 'function') {
    throw new TypeError('fn is not a function')
  }
  let timer = null
  //上一次触发数的时间（用闭包延长生命周期）
  let oldTime = Date.now()
  //   let oldTime = +new Date() 作用同上
  return (...args) => {
    //当前触发的时间
    let newTime = Date.now()
    //从上一次到现在还剩下多少时间
    // const remaining = delay - (newTime - oldTime)
    clearTimeout(timer)
    // if (remaining <= 0) {
    if(newTime - oldTime > delay) {
      //时间到了
      fn.call(this, ...args)
      //同步上一次触发的时间
      oldTime = Date.now()
    } else {
      //第一次触发事件的程序出口
      timer = setTimeout(() => {fn.call(this,...args)}, newTime - oldTime)
    }
  }
}
