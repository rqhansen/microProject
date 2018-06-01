Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorInfo: [],
    article: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getData: function(index) {
    let that = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5a23a9a2ff38a436c591b6fa/getArticInfo',
      success: function (res) {
        console.log(res.data.data);
        that.setData({
          authorInfo: res.data.data.index[index].articleInfo[0],
          article: res.data.data.index[index].articleInfo
        })
      }
    })
  },
  onLoad: function (options) {
      let index = options.id;
      this.getData(index);
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