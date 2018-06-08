var funcname ="https://www.xuchaoyang.cn/php/funcname.php?id=";
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    open:false,
    length:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.showToast({
      title: '加载中...',
      icon: "loading",
      duration: 10000
    });
    wx.request({
      url: funcname+options.id,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        wx.hideToast();
        app.setPageTitle(res.data.data.name)
        if (res.data.data.state.length ==0 ){
            var length = false
        }
        that.setData({
          length:length,
          list:res.data.data,
        })
        for (var name in res.data.data) {
          WxParse.wxParse(name, 'html', res.data.data[name], that, 5);
        }
      }
    })
    console.log(this.data.list)
    wx.setNavigationBarTitle({
      title:"",
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    
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
