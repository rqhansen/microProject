const util = require('../../utils/util.js');
Page({

  /**
   * 底部tab切换时--触发hiden和show
   * 页面的初始数据
   */
  data: {
    stack: [],
    screenHeight: 0, //屏幕高度
    clientHeight: 0, //可见区域高度
    arr: [],
    arrHeight:[],
    animationData: '',
    defaultImage: '../../assets/images/start.jpg'
  },
  /**
   * 获取数据
   */
  getData: function (cd,flag) {
    var that = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5a23a9a2ff38a436c591b6fa/getArticInfo',
      success: function (res) {
        wx.hideLoading();
        if(flag) {
          wx.stopPullDownRefresh();
        } 
        if(typeof cd === 'function') {
          cd(res.data.data,flag);
        }
      }
    })
  },
  /**
   * 初始化数据
   */
  init: function (data,flag) {
    let that = this;
    wx.getSystemInfo({ //异步？
      success: function (res) {
        that.setData({
          screenHeight: res.screenHeight, //计算屏幕高度
          clientHeight: res.windowHeight //可见区域的高度
        })
      }
    })
    let arrHeight = [];
    let arr = [];
    data.stack.forEach((item,i) =>{
      arrHeight[i] = i * (this.data.screenHeight / 667) * 91;
      arr[i] = false;
      if (arrHeight[i] < this.data.clientHeight || (flag && i<=this.data.stack.length)) {
        arr[i] = true;
      }
    })
    this.setData({
      stack: data.stack,
      arrHeight: arrHeight,
      arr: arr
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    console.log('onLoad');
    this.getData(this.init);
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
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide");
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
    wx.showLoading({
      title: '加载中',
    })
    this.getData(this.init,true);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    })
    // let animation = util.toslideUp(-15,0);
    // this.setData({
    //   animationData: animation
    // })
    this.getData(this.init,true);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  /**
 * 监听页面滚动
 */
  onPageScroll: function (res) {
    let tempArr = this.data.arr;
    for (let i =0 ,len = this.data.stack.length;i < len;i++) {
      if(this.data.arrHeight[i] < res.scrollTop + this.data.clientHeight) {
        if(!this.data.arr[i]) {
          tempArr[i] = true;
          this.setData({
            arr:tempArr 
          })
        }
      }
    }
  }
})