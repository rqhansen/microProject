// components/search.js
Component({
  externalClasses: ["search-class"],
  /**
   * 组件的属性列表
   */
  properties: {
    inputVal: { //输入的值
      type:String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    _goSearch() { //搜索
      this.triggerEvent('gosearch');
    }
  }
})
