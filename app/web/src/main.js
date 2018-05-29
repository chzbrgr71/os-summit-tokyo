import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import mapboxgl from 'mapbox-gl'

Vue.config.productionTip = false
Vue.use(iView)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});