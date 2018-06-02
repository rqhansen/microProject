const util = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    authorInfo: [],         //
    animationData: {},  //动画
    isCare:false,       //是否关注作者
    index: null,        //文章索引
    isLike: false,      //是否收藏
    likeImgs: ['../../../../assets/images/like.png','../../../../assets/images/like_active.png'],
    loading: false
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  getData: function(index) {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5a23a9a2ff38a436c591b6fa/getArticInfo',
      success: function (res) {
        that.setData({
          authorInfo: res.data.data.index[index].articleInfo[0],
          // article: res.data.data.index[index].articleInfo,
          index: index
        })
        wx.hideLoading();
      }
    })
  },
  /**
   * 点赞
   */
  deepThumb: function () {

  },
  /**
   * 查看评论
   */
  showTalk: function () {
    wx.showModal({
      title: '温馨提示',
      content: '暂未开放',
    })
  },
  /**
   * 收藏文章
   */
  like: function () {
      if (!this.data.isLike) {
        wx.showToast({
          title: '收藏成功'
        })
      } else {
        wx.showToast({
          title: '取消收藏',
        })
      }
      this.setData({
        isLike: !this.data.isLike
      })
  },

  /**
   * 开始阅读
   */
  startRead: function (){
    wx.showModal({
      title: '阅读提示',
      content: '请前往个人中心充值购买',
    })
  },
  /**
   * 关注作者
   */
  changeBackground: function () {
    this.setData({
      isCare: !this.data.isCare
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
    // let animation = util.toslideUp();
    // this.setData({
    //   animationData:animation
    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    let shareObj = {
      title: '早读',
      imgUrl: '',
      path: `/pages/leader/stories/stories?id=${this.data.index}`,
      success: function (res) { //成功的回调
        wx.showModal({
          title: '成功分享',
          content: res,
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '分享失败',
          content: res,
        })
      },
      cancel: function (res) {
        wx.showModal({
          title: '分享取消',
          content: res,
        })
      },
      complete: function (res) {
        wx.showModal({
          title: '分享了',
          content: res,
        })
      }
    }
    // if(options.from === 'button') { //来自页面内按钮点击

    //}
    return shareObj;
  }
})