
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
    console.log('onLoad');
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
    console.log('onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow');
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
    console.log('onHide');
    this.setData({
      isReload : false
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
      console.log('onUnload');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      this.getData(() =>{
        wx.stopPullDownRefresh()
      })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var animation = wx.createAnimation({
      duration: 1500,
      timingFunction: 'ease',
      delay: 0
    })
    this.animation = animation;
    animation.translateY(-15).step();//动画一
    animation.translateY(0).step();//动画二
    this.setData({
      animationData: animation
    })
    wx.showLoading({
      title: '加载中'
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
        title: '早睡早读书',
        path:'/page/stack/stack'
      }
    }
  }
})