Page({
  data: {
    checkSize: 70,
    checkColor: 'green',
    checkType: 'success',
    checkText: '签到成功',
    checkBtnText: '返回首页'
  },
  jumpIndex: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  }
})