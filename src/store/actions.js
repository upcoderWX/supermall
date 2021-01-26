import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
  addCart(context, info) {
    return new Promise((resolve, reject) => {
      // 1.查看是否添加过
      const oldInfo = context.state.cartList.find(item => item.iid === info.iid)
      // 2.+1或者新添加
      if (oldInfo) {
        context.commit(ADD_COUNTER, oldInfo)
        resolve('当前商品数量+1！')
      } else {
        info.count = 1
        info.checked = true
        context.commit(ADD_TO_CART, info)
        resolve('添加了新商品！')
      }   
    })
  }
}