import Component, { mixins } from 'vue-class-component'
import SortBase from './sortbase'

@Component
export default class BubbleSort extends mixins(SortBase) {
  sortName() {
    return 'バブルソート'
  }

  *sortImpl() {
    for (let i = 0; i < this.items.length; i++) {
      for (let j = this.items.length - 1; j > i; j--) {
        this.setitemStatus([j - 1, j])
        if (this.items[j - 1].number > this.items[j].number) {
          this.swap(j - 1, j)
        }
        yield true
      }
    }

    this.setitemStatus([])
  }
}
