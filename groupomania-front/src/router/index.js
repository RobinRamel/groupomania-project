import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '@/components/Register'
import Login from '@/components/Login'
import ModifyPost from '@/views/ModifyPost'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/modify-post',
    name: 'modifyPost',
    component: ModifyPost,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
