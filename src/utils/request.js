import axios from 'axios'
import nprogress from 'nprogress'

export default function request(config) {
  const instance = axios.create({
    baseURL: 'https://xin-music-api.vercel.app/',
    // baseURL: 'http://localhost:3000',
    // timeout: 5000,
  })
    
    instance.interceptors.request.use(config => {
        nprogress.start()
        return config
    })

    instance.interceptors.response.use(res => {
        nprogress.done()
        return res.data
    })

    return instance(config)
}
