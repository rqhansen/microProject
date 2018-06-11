const util  = require("../../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: '', //绑定到输入框的变量，用来清除输入框的值
    keyword: '', //存储输入框的值
    bookList:[],
    resultList: null, //搜索的结果
    historyWord: [] //搜索历史
  },
  /**
   * 输入框获得焦点
   */
  focusInput: function () {
    this.updateData({
      resultList: null,
      historyWord: wx.getStorageSync("history")
    })
  },
  /**
   * 输入框点击搜索
   * 1.输入关键词搜索
   * 2.点击历史搜索词搜索
   */
  search: function (val) {
    if((typeof val !== "string" && !val.detail) || !val) {
      return 
    }
    let key = typeof val === "string" ? val : " "; 
    let config = {};
    if(typeof val !== "string") {
      key = val.detail.trim();
      config.keyword = key;
      util.storageData('history', key);//设置缓存
    }
    let result = this.localSearch(key);//检索本地文件
    config.resultList = result;
    config.inputVal = "";
    this.updateData(config);
  },
  /**
   * 搜索历史关键词
   */
  searcHistory: function (e) {
    let key = e.currentTarget.dataset.key;
    this.search(key);
  },
  /**
   * 清除输入框的值
   */
  clear: function () {
    this.setData({
      inputVal: ''
    })
  },
  /**
   * 更新数据
   */
  updateData: function (config) {
    this.setData(config)
  },
  /**
   * 检索内容
   */
  localSearch: function (val) {
    let result = [];
    this.data.bookList.forEach(item => {
      if (item.bookName.includes(val) || item.authorName.includes(val)) {
        result.push(item);
      }
    })
    return result;
  },
  /**
   * 初始化数据
   */
  getData: function (index) {
    let that = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5a23a9a2ff38a436c591b6fa/getArticInfo',
      success: function (res) {
        that.updateData({
          bookList: res.data.data.stack[index].List.bookList,
          historyWord: wx.getStorageSync("history")
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options.index);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})