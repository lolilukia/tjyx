Page({
  data: {
    cancelSize: 70,
    cancelColor: 'green',
    cancelType: 'success',
    cancelText: '退报名成功',
    cancelBtnText: '返回首页'
  },
  jumpIndex: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  }
})