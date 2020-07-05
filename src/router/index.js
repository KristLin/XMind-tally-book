import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddBill from '../views/AddBill.vue'
import AddCat from '../views/AddCat.vue'
import ShowChart from '../views/ShowChart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/addBill',
    name: 'AddBill',
    component: AddBill
  },
  {
    path: '/addCat',
    name: 'AddCat',
    component: AddCat
  },
  {
    path: '/showChart',
    name: 'ShowChart',
    component: ShowChart
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
