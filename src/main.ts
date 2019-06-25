import Vue from 'vue'
import App from './App.vue'
import MyComponent from './sort'

Vue.config.productionTip = false

let vm = new Vue({
  el: '#app',
  components: {
    'my-component': MyComponent
  }
})
