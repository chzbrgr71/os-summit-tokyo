// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import '../static/css/vuetify.min.css'

Vue.use(Vuetify, { theme: {
  primary: '#1DE9B6',
  secondary: '#4DB6AC',
  accent: '#00796B',
  error: '#FF8A80',
  warning: '#ffeb3b',
  info: '#607D8B',
  success: '#00E676'
}})

// .theme--dark .toolbar = #1e3042
// .application.theme--dark = #293d50
// .theme--dark .navigation-drawer = #203346
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
