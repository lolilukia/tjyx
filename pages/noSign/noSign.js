Page({
  data: {
    iconSize: 70,
    iconColor: 'red',
    iconType: 'warn',
    text: '你尚未报名！',
    btnText: '返回'
  },
  jumpBack: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  },
})