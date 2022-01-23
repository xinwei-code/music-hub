import axios from 'axios'
import nprogress from 'nprogress'
// import { message } from 'antd'


// const key = 'updatable'
export default function request(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: 'https://cloud-music-jdpmbpbxg-weixin.vercel.app',
      // baseURL: 'http://localhost:3000',
      // timeout: 5000,
    })

    instance.interceptors.request.use(config => {
      //进度条
      nprogress.start()
      // message.loading({ content: '数据加载中。。。', key })
      return config
    })
    instance.interceptors.response.use(response => {
      //隐藏进度条
      nprogress.done()
      // message.success({ content: '加载成功!', key, duration: 2 })
      return response.data
    })

    instance(options)
      .then(res => {
        resolve(res)
      })
      .catch(err => reject(err))
  })
}
