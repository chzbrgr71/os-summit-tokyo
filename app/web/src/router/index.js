import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import About from '../components/About'
import Map from '../components/Map'
import Footer from '../components/Footer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      components: { main: Home, footer: Footer}
    },
    {
      path: '/about',
      name: 'About',
      components: { main: About, footer: Footer} 
    },
    {
      path: '/map',
      name: 'Map',
      components: { main: Map, footer: Footer} 
    }
  ]
})