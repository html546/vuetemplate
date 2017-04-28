
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

import config from './config'
Vue.prototype.$config = config

import api from './api'
Vue.prototype.$api = api

import routes from './routes'
const router = new VueRouter({
  routes
})

import App from './App'
/* eslint-disable no-new */
new Vue({ // eslint-disable-line no-new
  router,
  el: '#app',
  render: (h) => h(App)
})
