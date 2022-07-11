/**
 * 引入axios
 *
 * 创建axios实例对象
 *
 * 创建请求拦截器
 *
 * 创建响应拦截器
 *
 * 统一传参方式   处理 get请求方式依旧可以使用data方式传参
 *
 * 全局loading加载
 *
 * 处理路由切换接口重复请求
 *
 * 导出axios实例对象
 *
 */

// 导入axios
import axios from 'axios'

// 创建axios实例对象
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 统一了传参处理
const request = (options) => {
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data || {}
  }
  return service(options)
}

// 导出axios实例对象
export default request
