import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: '',
    chatting: ''
  },
  mutations: {
    currentUser(state, data) {
      console.log('lol', data)
      state.currentUser = data
    },
    chatWith(state, data) {
      state.chatting = data
    }
  },
  actions: {

  }
})
