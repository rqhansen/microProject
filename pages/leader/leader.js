const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
    imageUrls: [
        '../../assets/images/pointer.png',
        '../../assets/images/thumb.png'
    ],
    flag: false,
    animationData: {},
    isReLoad: false //判断是否从首页进来
  },
  /**
   * 请求数据
   */
  getData: function(cb) {
    wx.request({
      url: 'https://www.easy-mock.com/mock/5a23a9a2ff38a436c591b6fa/getArticInfo',
      success: res => {
        let list = res.data.data.index;
        list.forEach(item => {
          item.thumbUrl = this.data.imageUrls[0];
        })
        this.setData({
          bookList: list
        })
        if (typeof cb === 'function') {
          cb()
        }
      }
    })
  },
  /**
   * 点赞
   */
  onThumb: function(e) {
    this.data.flag = !this.data.flag
    let index = e.currentTarget.dataset.index
    let item = this.data.bookList[index];
    item.thumbUrl =  this.data.imageUrls[+this.data.flag]
    item.thumbUp = this.data.flag ? +item.thumbUp+1 : +item.thumbUp-1
    this.setData({
      flag: this.data.flag,
      bookList: this.data.bookList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('onLoad');
    this.setData({
      isReload : true
    })
    this.getData(() =>{
      wx.hideLoading();
    });
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
    if(this.data.isReload) {
      wx.showLoading({
        title: '加载中'
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      isReload : false
    })
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
    wx.showLoading({
      title: '加载中',
    })
    this.getData(() =>{
      wx.stopPullDownRefresh();
      wx.hideLoading();
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中'
    })
    let animation = util.toslideUp(); //上滑动画
    this.setData({
      animationData: animation
    })
    this.getData(() =>{
      wx.hideLoading()
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'menu') {
      return {
        title: '早读',
        path:'/pages/stack/stack',
      }
    }
  }
})