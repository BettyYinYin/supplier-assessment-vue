import axios from 'axios'
import store from '@/store'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(

  config => {
    // 发送请求前先通过钉钉API获取到code值
    return store.dispatch('user/fetchCode').then(() => {
      config.params = {
        code: store.getters.userCode,
        ...config.params
      }
      return config
    }).catch(err => {
      return config
    })
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get information such as headers or status
   * Please return  response => response
   */

  response => {

    const res = response.data
    if (!res.success) {
      return Promise.reject({
        message: res.errorMsg || '请求失败'
      })
    } else {
      return res
    }
  },
  error => {
    const err = error.response
    if (!(err && err.status)) {
      return Promise.reject({
        message: '接口请求出错'
      })
    }
    switch (err.status) {
      case 404:
        err.message = '接口地址不正确';
        break;
      case 500:
        err.message = '服务器异常';
        break;
      default:
        err.message = '请求错误'
    }
    return Promise.reject(err)
  }
)

export default service