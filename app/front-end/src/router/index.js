import Vue from 'vue'
import Router from 'vue-router'
import Flights from '@/components/Flights'
import Fracking from '@/components/Fracking'
import Quakes from '@/components/Quakes'
import Weather from '@/components/Weather'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/flights',
      name: 'Flights',
      component: Flights
    },
    {
      path: '/fracking',
      name: 'Fracking',
      component: Fracking
    },
    {
      path: '/quakes',
      name: 'Quakes',
      component: Quakes
    },
    {
      path: '/weather',
      name: 'Weather',
      component: Weather
    }
  ]
})
