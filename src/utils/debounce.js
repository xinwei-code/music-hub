/* 
封装一个防抖函数 
*/
export default function debounce(fn, delay = 200) {
  //默认延时200ms
  if (typeof fn !== 'function') {
    throw new TypeError('fn is not a function!')
  }
  let timer = null
  return  (...args) =>{
    if (timer) {
      clearTimeout(timer)
    }
    // const that = this;
    timer = setTimeout(() => {
      fn.call(this, ...args)
      timer = null
    }, delay)
  }
}
// const add1 = (a, b) => {
//   console.log(this);
//   return console.log(a + b)
// }

/* const o = {
  func: debounce
} */
/* debounce(add1,1000)(2,3)
debounce(add1, 1000)(4, 5) */
// o.func(add1,1000)(3,4)
