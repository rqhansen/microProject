// components/search.js
Component({
  externalClasses: ["search-class"],
  /**
   * 组件的属性列表
   */
  properties: {
    inputVal: { //输入的值
      type:String,
      value: '',
      observer: function (newVal,oldVal) {
        console.log(newVal,oldVal);
      }
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
    /**
     * 跳到搜索页
     */
    _goSearch() {
      this.triggerEvent('gosearch');
    },
    /**
     * 搜索时传递值
     */
    _triggerValue(e) {
      this.triggerEvent('triggerValue',e.detail.value);
    },
    _focusInput () {
      this.triggerEvent("focusInput");
    }
  }
})
