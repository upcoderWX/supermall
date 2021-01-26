import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 给buS赋值vue实例，vue实例可以发送事件
Vue.prototype.$bus = new Vue()

Vue.use(toast)

// 移动端300ms延迟问题 1、安装npm 2、导入 3、调用attach函数
FastClick.attach(document.body)

// 使用懒加载插件
Vue.use(VueLazyLoad, { 
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
