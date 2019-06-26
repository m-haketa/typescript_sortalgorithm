import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, PropSync } from 'vue-property-decorator'

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
export default class InsertionSort extends Vue {
  @Prop() inititems!: number[]
  @Prop() dosort!: boolean

  itemCount = this.inititems ? this.inititems.length : 0
  items = this.setitems()
  sortLogic = this.sortImpl()

  setitems(): ItemData[] {
    this.sort()
    if (this.inititems === undefined) {
      return []
    }
    return this.inititems.map(function(value: number) {
      return { number: value, status: { moving: false, using: false } }
    })
  }

  sort() {
    setTimeout(() => {
      if (this.dosort === true) {
        const ret = this.sortLogic.next()
        if (ret.done) {
          return false
        }
      }
      this.sort()
    }, 1000)
    return true
  }

  setitemStatus(moving: number[], using: number[] = []) {
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

  swap(i: number, j: number) {
    const swpTemp = this.items[j].number
    this.items[j].number = this.items[i].number
    this.items[i].number = swpTemp
  }

  *sortImpl() {
    for (let i = 1; i < this.items.length; i++) {
      this.setitemStatus([i - 1, i])
      if (this.items[i - 1].number > this.items[i].number) {
        let j = i
        do {
          this.swap(j - 1, j)
          yield true
          j--

          if (j > 0) {
            this.setitemStatus([j - 1, j])
          }
        } while (j > 0 && this.items[j - 1].number > this.items[j].number)
      } else {
        yield true
      }
    }

    this.setitemStatus([])
  }
}