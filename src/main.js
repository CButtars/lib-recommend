import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import axios from './plugins/axios'
import './plugins/bootstrap-vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'

// Set the baseURL on app load
//axios.defaults.baseURL = 'https://api.lib.byu.edu/leaflet'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  render: h => h(App),
}).$mount('#app')
