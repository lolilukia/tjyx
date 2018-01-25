Page({
  data: {
    rechargeText: '扫描下方二维码，20元/10次活动',
    btnText: '返回'
  },
  jumpBack: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  },
})