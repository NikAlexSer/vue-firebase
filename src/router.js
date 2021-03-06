import firebase from 'firebase'
import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import Home from './views/Home.vue'
import Chats from './views/Chats.vue'
import Search from './views/Search.vue'
import Lk from './views/Lk.vue'
import Info from './views/Info.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/chats',
      name: 'Chats',
      component: Chats,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/cabinet',
      name: 'Lk',
      component: Lk,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/info',
      name: 'Info',
      component: Info,
      meta: {
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;

  if (localStorage.getItem('currentUser') && firebase.auth().currentUser) {
    console.log('fewfew')
    store.commit('currentUser', localStorage.getItem('currentUser'))
  }
  
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('home')
  else next()
})

export default router;
