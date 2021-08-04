import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import { sync } from 'vuex-router-sync'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)


Vue.config.productionTip = false

sync(store, router)

new Vue({
  store,
  router,
  beforeCreate() { this.$store.commit('initialiseStorage') },
  render: h => h(App)
}).$mount('#app')
