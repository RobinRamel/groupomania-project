import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },

    setUser (state, user) {
      state.user = user
    },

    initialiseStorage(state) {
      // LS = Localstorage
      const userLS = JSON.parse(localStorage.getItem('gpm-user'))
      const tokenLS = JSON.parse(localStorage.getItem('gpm-token'))
      // console.log('userLS : ', userLS)
      // console.log('tokenLS : ', tokenLS)

      if (userLS && tokenLS) {
        state.token = tokenLS
        state.user = userLS
        state.isUserLoggedIn = true
      }
    },

    userDeconnection(state) {
      state.token = null
      state.user = null
      state.isUserLoggedIn = false
      localStorage.removeItem('gpm-user')
      localStorage.removeItem('gpm-token')
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    }
  },
  modules: {
  }
})
