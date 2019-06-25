import Vue from 'vue'
import Component from 'vue-class-component'

interface ItemStatus {
  moving: boolean
  using: boolean
}

@Component({
  template: `
    <div id="list-complete-demo" class="demo">
      <button v-on:click="start">Start</button>
      <button v-on:click="stop">Stop</button>
      <transition-group name="list-complete" tag="p">
        <span
          v-for="(item,index) in items"
          v-bind:key="item"
          v-bind:class="getStatus(index)"
          class="list-complete-item"
        >
          {{ item }}
        </span>
      </transition-group>
    </div>
  `
})
export default class BubbleSort extends Vue {
  itemCount = 9
  items = [] as number[]
  itemStatus = [] as ItemStatus[]
  doSort = false
  sortLogic = this.sortImpl()

  init() {
    this.sortLogic = this.sortImpl()
    this.items = []
    for (let i = 0; i < this.itemCount; i++) {
      this.items.push(i + 1)
      this.itemStatus.push({ moving: false, using: false })
    }
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

  getStatus(index: number) {
    return this.itemStatus[index]
  }

  _setitemStatus(moving: number[], using: number[] = []) {
    for (let i = 0; i < this.itemCount; i++) {
      this.itemStatus[i].moving = false
      this.itemStatus[i].using = false
    }

    moving.forEach(index => {
      this.itemStatus[index].moving = true
    })

    using.forEach(index => {
      this.itemStatus[index].using = true
    })
  }

  *sortImpl() {
    for (let i = 0; i < this.items.length; i++) {
      for (let j = this.items.length - 1; j > i; j--) {
        this._setitemStatus([j - 1, j])
        if (this.items[j - 1] > this.items[j]) {
          const swpTempArr = this.items.splice(j - 1, 1, this.items[j])
          this.items.splice(j, 1, swpTempArr[0])
        }

        yield true
      }
    }

    this._setitemStatus([])
    while (true) {
      yield false
    }
  }
}
