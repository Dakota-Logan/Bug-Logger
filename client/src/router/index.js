import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import bug from '../views/Bug.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/bug/:id',
    name: 'bug',
    component: bug
  }
]

const router = new VueRouter({
  routes
})

export default router
