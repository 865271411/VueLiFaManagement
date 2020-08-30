import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
import qs from 'qs'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css'
import 'echarts/lib/chart/line'
import echarts from 'echarts'
import myCharts from './components/myCharts.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.use(myCharts)

Vue.use(echarts)

axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.baseURL = ''
// axios.interceptors.request.use(config => {
//   config.headers.Authorization = window.seesionStorage.getItem('token')
//   return config
// })

if (process.env.MOCK) {
  require('@/mock/index.js')
}
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
//Vue.prototype.$http=axios
//Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
