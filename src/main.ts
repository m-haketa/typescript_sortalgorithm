import Vue from 'vue'
import App from './App.vue'
import BubbleSort from './sort'

Vue.config.productionTip = false

let vm = new Vue({
  el: '#app',
  components: {
    'bubble-sort': BubbleSort
  }
})
