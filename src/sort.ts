import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  template: `
    <div id="list-complete-demo" class="demo">
      <button v-on:click="shuffle">Shuffle</button>
      <button v-on:click="sort">Sort</button>
      <button v-on:click="stop">Stop</button>
      <transition-group name="list-complete" tag="p">
        <span
          v-for="item in items"
          v-bind:key="item"
          class="list-complete-item"
        >
          {{ item }}
        </span>
      </transition-group>
    </div>
  `
})
export default class MyComponent extends Vue {
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  nextNum = 10
  doSort = false
  sortLogic = this.sortImpl()

  shuffle() {
    const _ = require('underscore')
    this.items = _.shuffle(this.items)
  }

  stop() {
    this.doSort = false
  }

  sort() {
    this.doSort = true
    setTimeout(() => {
      if (this.doSort === true && this.sortLogic.next()) {
        this.sort()
      }
    }, 1000)
  }

  *sortImpl() {
    for (let i = 0; i < this.items.length; i++) {
      for (let j = this.items.length - 1; j > i; j--) {
        console.log(this.items, i, j)
        yield true

        if (this.items[j - 1] > this.items[j]) {
          const swpTempArr = this.items.splice(j - 1, 1, this.items[j])
          this.items.splice(j, 1, swpTempArr[0])
        }
      }
    }

    while (true) {
      yield false
    }
  }
}
