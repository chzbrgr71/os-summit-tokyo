import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Quakes from '@/components/Quakes'
import Flights from '@/components/Flights'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/quakes',
      name: 'Quakes',
      component: Quakes
    },
    {
      path: '/flights',
      name: 'Flights',
      component: Flights
    }
  ]
})
