import axios from 'axios'

export function request(config) {
  // 1、创建实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeOut: 5000
  })

  // 2、拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log('请求错误：' + err);
  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log('响应错误：' + err);
  })

  // 3.发送真正的网络请求
  return instance(config)
} 
