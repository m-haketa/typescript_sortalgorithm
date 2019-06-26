import BubbleSort from './bubblesort'

export default class OtherSort extends BubbleSort {
  *sortImpl() {
    yield false
  }
}
