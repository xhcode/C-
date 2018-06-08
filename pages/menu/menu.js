var api ="https://www.xuchaoyang.cn/php/";
var title = "";
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    funname:[],
    open:[],
    list:[],
    index:"",
    info:"",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  setPageTitle: function (title) {
    wx.setNavigationBarTitle({
      title: title,
      success: function () {

      },
      complete: function () {

      }
    });
  },
  click:function(e){
    var that = this;
    var list = that.data.funname;
    var open = that.data.open;
    var len = list.length;
    var name = e.currentTarget.id;
    for(var i=0;i < len;i++){
      if(name == list[i]){
        open[list[i]] = !open[list[i]];
      } else{
        open[list[i]] = false;
      }
    }
    that.setData({
      open:open
    }) 
  },
  onLoad: function (options) {
    var that = this;
    wx.showToast({
      title: '加载中...',
      icon:"loading",
      duration:10000
    });
    wx.request({
      url: api + options.id + ".php?cat=all",
      data:{},
      header:{
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        wx.hideToast();
        title = res.data.title;
        var data=res.data;
        var open={};
        var funname = new Array(); 
        for(var name in data.data){
          open[name] = false;
          funname.push(name);
        }
        that.setData({
          funname:funname,
          open:open,
          list: data.data,
          index:options.id,
          info:data.info,
        });
        that.setPageTitle(title)
        console.log(res.data.title)
      }
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