Page({
  data: {
    iconSize: 70,
    iconColor: 'red',
    iconType: 'warn',
    text: '请先进行账号绑定',
    btnText: '绑定账号'
  },
  jumpBind: function () {
    wx.redirectTo({
      url: '../bind/bind'
    })
  },
})