// 对首页网络请求再次封装，方便多次访问的修改

import {request} from './request'

export function getHomeMutidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
