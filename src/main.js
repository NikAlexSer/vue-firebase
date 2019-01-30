import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import firebase from 'firebase/app'
require('firebase/firestore')


let app = ''

firebase.initializeApp({
  apiKey: "AIzaSyCpjYf4uzrz3yKzyheFfc3lZ2ZPHszOVac",
  authDomain: "vue-lk.firebaseapp.com",
  databaseURL: "https://vue-lk.firebaseio.com",
  projectId: "vue-lk",
  storageBucket: "vue-lk.appspot.com",
  messagingSenderId: "1008368761938"
})
let db = firebase.firestore();
window.db = db;

export default firebase.firestore()

Vue.config.productionTip = false
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: function (h) { return h(App) }
    }).$mount('#app')
  }
})
