import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta:{
      isShowNavBar:true,
    },
    component: Home
  },
  {
    path: '/hot',
    name: 'Hot',
    meta:{
      isShowNavBar:true,
    },
    // route level code-splitting
    // this generates a separate chunk (Hot.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Hot" */ '../views/Hot.vue')
  },
  {
    path:'/search',
    name:'Search',
    meta:{
      isShowNavBar:true,
    },
    component:() => import('../views/Search.vue'),
  },
  {
    path:'/recommend',
    name:'Recommend',
    component:() => import('../views/Recommend.vue'),
  }
]

const router = new VueRouter({
  routes
})

export default router
