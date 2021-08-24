import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// github lazyload 通过npm安装
import VueLazyload from 'vue-lazyload'

import FastClick from 'fastclick'

import toast from 'components/common/toast'

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)

// 图片懒加载
Vue.use(VueLazyload,{
	preLoad:1.3,
	error:require('assets/img/common/error.svg'),
	loading:require('assets/img/common/lazyload.gif')
})


// 解决移动端300ms延迟
FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
