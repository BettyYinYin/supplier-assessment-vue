import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './permissions'
import './icons' // icon
import 'mint-ui/lib/style.css' // mint-ui css
import '@/styles/main.css' // global css
import '@/styles/global.scss'
import * as filters from '@/filters'
import * as directives from '@/directives'
import '@/utils/ui.config'
import moment from 'moment'
import FastClick from 'fastclick'

moment.locale('zh-cn');

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

Vue.config.productionTip = false

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false);
}


new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router
})