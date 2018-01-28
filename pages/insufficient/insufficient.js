Page({
  data: {
    iconSize: 70,
    iconColor: 'red',
    iconType: 'warn',
    text: '你剩余次数不足，请充值',
    btnText: '充值'
  },
  jumpRecharge: function () {
    wx.redirectTo({
      url: '../recharge/recharge'
    })
  },
})