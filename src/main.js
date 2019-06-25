import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import Mock from './mock'
Mock.start()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
