import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  template: `
    <div id="list-complete-demo" class="demo">
      <button v-on:click="start">Start</button>
      <button v-on:click="stop">Stop</button>
      <transition-group name="list-complete" tag="p">
        <span
          v-for="(item,index) in items"
          v-bind:key="item"
          v-bind:class="{moving: isMoving(index)}"
          class="list-complete-item"
        >
          {{ item }}
        </span>
      </transition-group>
    </div>
  `
})
export default class BubbleSort extends Vue {
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  itemMoving = [-1, -1]
  doSort = false
  sortLogic = this.sortImpl()

  init() {
    this.sortLogic = this.sortImpl()
    this.itemMoving = [-1, -1]
    const _ = require('underscore')
    this.items = _.shuffle(this.items)
  }

  stop() {
    this.doSort = false
  }

  start() {
    this.init()
    this.sort()
  }

  sort() {
    this.doSort = true
    setTimeout(() => {
      if (this.doSort === true && this.sortLogic.next()) {
        this.sort()
      }
    }, 1000)
  }

  isMoving(no: number) {
    return no === this.itemMoving[0] || no === this.itemMoving[1]
  }

  *sortImpl() {
    for (let i = 0; i < this.items.length; i++) {
      for (let j = this.items.length - 1; j > i; j--) {
        this.itemMoving = [j - 1, j]
        if (this.items[j - 1] > this.items[j]) {
          const swpTempArr = this.items.splice(j - 1, 1, this.items[j])
          this.items.splice(j, 1, swpTempArr[0])
        }

        yield true
      }
    }

    this.itemMoving = [-1, -1]
    while (true) {
      yield false
    }
  }
}
