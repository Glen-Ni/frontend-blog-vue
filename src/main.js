import Vue from 'vue'
import App from './App.vue'
import router from './router'

/* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  template: '<App />',

  components: {
    App
  },
  router
})
