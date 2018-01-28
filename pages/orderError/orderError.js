Page({
  data: {
    iconSize: 70,
    iconColor: 'red',
    iconType: 'warn',
    text: '你目前报名次序在30之外',
    btnText: '返回'
  },
  jumpBack: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  },
})