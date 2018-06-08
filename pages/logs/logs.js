Page({
  data: {
    modalHidden: true,
    modalHidden2: true
  },
  sites: function (e) {
    wx.showModal({
      title: "参考网站",
      content: "C语言手册",
      confirmText: "确定",
      cancelText: "取消"
    })
  },
  gson: function (e) {
    wx.showModal({
      title: "开源项目",
      content: "wxParse",
      confirmText: "确定",
      cancelText: "取消"
    })
  },
  github: function (e) {
    wx.showModal({
      title: "github地址",
      content: "暂无",
      confirmText: "确定",
      cancelText: "取消"
    })
  },
 developer: function (e) {
   wx.showModal({
      title: "开发者信息",
      content: "王承帆     徐超阳       徐宏",
      confirmText: "确定",
      cancelText: "取消"
    })
  }
})
