import Component, { mixins } from 'vue-class-component'
import SortBase from './sortbase'

@Component
export default class InsertionSort extends mixins(SortBase) {
  sortName() {
    return 'インサーションソート'
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
          if (j <= 0) {
            break
          } else {
            this.setitemStatus([j - 1, j])
            if (this.items[j - 1].number <= this.items[j].number) {
              yield true
              break
            }
          }
        } while (true)
      } else {
        yield true
      }
    }

    this.setitemStatus([])
  }
}
