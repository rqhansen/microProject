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
      observer: function (newVal,oldVal) { //组件所在的标签文件，外部改变
        // console.log(newVal,oldVal);
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
    // /**
    //  * 跳到搜索页
    //  */
    // _goSearch() {
    //   this.triggerEvent('goSearch');
    // },
    /**
     * 搜索时传递值
     */
    _triggerValue(e) {
      this.triggerEvent('triggerValue',e.detail.value);
    },
    /**
     * 输入框获得焦点
     */
    _focusInput () {
      this.triggerEvent("focusInput");
    },
    /**
     * 输入框输入中
     */
    _oninput(e) {
      this.triggerEvent("oninput", e.detail.value);
    }
  }
})
