import Vue from 'vue'
import Component from 'vue-class-component'

interface ItemData {
  number: number
  status: ItemStatus
}

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
          v-for="item in items"
          v-bind:key="item.number"
          v-bind:class="item.status"
          class="list-complete-item"
        >
          {{ item.number }}
        </span>
      </transition-group>
    </div>
  `
})
export default class BubbleSort extends Vue {
  itemCount = 9
  items = [] as ItemData[]
  doSort = false
  sortLogic = this.sortImpl()

  init() {
    this.sortLogic = this.sortImpl()
    this.items = []
    for (let i = 0; i < this.itemCount; i++) {
      this.items.push({
        number: i + 1,
        status: { moving: false, using: false }
      })
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

  _setitemStatus(moving: number[], using: number[] = []) {
    for (let i = 0; i < this.itemCount; i++) {
      this.items[i].status.moving = false
      this.items[i].status.using = false
    }

    moving.forEach(index => {
      this.items[index].status.moving = true
    })

    using.forEach(index => {
      this.items[index].status.using = true
    })
  }

  _swap(i: number, j: number) {
    const swpTemp = this.items[j].number
    this.items[j].number = this.items[i].number
    this.items[i].number = swpTemp
  }

  *sortImpl() {
    for (let i = 0; i < this.items.length; i++) {
      for (let j = this.items.length - 1; j > i; j--) {
        this._setitemStatus([j - 1, j])
        if (this.items[j - 1].number > this.items[j].number) {
          this._swap(j - 1, j)
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
