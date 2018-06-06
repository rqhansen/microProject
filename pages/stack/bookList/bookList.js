Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
  },
  /**
   * 获取数据
   */
  getData: function (callback,index) {
    wx.request({
      url: 'https://www.easy-mock.com/mock/5a23a9a2ff38a436c591b6fa/getArticInfo',
      success: function (res){
        wx.hideLoading();
        console.log(res.data.data);
        callback(res.data.data,index)
      }
    })
  },
  /**
   * 初始化数据
   */
  init: function (data,index) {
      this.setData({
        bookList: data.stack[index].List.bookList
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.id;
    wx.showLoading({
      title: '加载中',
    })
    this.getData(this.init,index);
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