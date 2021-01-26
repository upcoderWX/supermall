import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
  [ADD_COUNTER](state, payLoad) {
    payLoad.count++
  },
  [ADD_TO_CART](state, payLoad) {
    state.cartList.push(payLoad)
  }
}