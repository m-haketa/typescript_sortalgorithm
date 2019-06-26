import Vue, { Component } from 'vue'
import App from './App.vue'
import BubbleSort from './bubblesort'
import InsertionSort from './insertionsort'
import OtherSort from './othersort'

Vue.config.productionTip = false

let vm = new Vue({
  el: '#app',
  data: {
    itemCount: 9,
    items: [] as number[],
    sorts: [] as string[],
    dosort: true
  },
  components: {
    'bubble-sort': BubbleSort,
    'insertion-sort': InsertionSort,
    'other-sort': OtherSort
  },
  methods: {
    start() {
      this.items = []
      for (let i = 0; i < this.itemCount; i++) {
        this.items.push(i + 1)
      }
      const _ = require('underscore')
      this.items = _.shuffle(this.items)

      this.destory()

      this.sorts.push('bubble-sort')
      this.sorts.push('insertion-sort')
      //this.sorts.push('other-sort') ※うまく動かない
    },

    resume() {
      this.dosort = true
    },

    suspend() {
      this.dosort = false
    },

    destory() {
      for (let i = 0; i < this.items.length; i++) {
        this.sorts.pop()
      }
    }
  }
})
