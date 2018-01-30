Page({
  data: {
    hasCheckSize: 70,
    hasCheckColor: 'green',
    hasCheckType: 'success',
    hasCheckText: '你已签到',
    stunum: '',
    actTime: '',
    order: '',
    timeText: '',
    orderText: '',
    returnCode: '',
    backText: '取消',
  },
  jumpBack: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  }
})