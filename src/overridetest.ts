import BubbleSort from './bubblesort'

export default class OverrideTestSort extends BubbleSort {
  //コンストラクタを入れると正常動作しない。
  //コンストラクタを取り除くとメソッドがオーバーロードされない
  constructor() {
    super()
    this.dummyFunc()
  }

  *sortImpl() {
    //コンストラクタなしだとオーバーライドされない
    console.log('overridetest')
    yield false
  }

  dummyFunc() {
    //コンストラクタなしだと追加作成されない？
    //メソッドを新規追加できるかテスト用にダミーで作成
    console.log('dummy')
  }
}
