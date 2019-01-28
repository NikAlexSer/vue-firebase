import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import firebase from 'firebase/app'
import 'firebase/firestore'


let app = ''

firebase.initializeApp({
  apiKey: "AIzaSyCpjYf4uzrz3yKzyheFfc3lZ2ZPHszOVac",
  authDomain: "vue-lk.firebaseapp.com",
  databaseURL: "https://vue-lk.firebaseio.com",
  projectId: "vue-lk",
  storageBucket: "vue-lk.appspot.com",
  messagingSenderId: "1008368761938"
})

export default firebase.firestore()

Vue.config.productionTip = false
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    store.commit('currentUser', firebase.auth().currentUser.email)
    app = new Vue({
      router,
      store,
      render: function (h) { return h(App) }
    }).$mount('#app')
  }
})
