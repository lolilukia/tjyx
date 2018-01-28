Page({
  data: {
    hasSignSize: 70,
    hasSignColor: 'green',
    hasSignType: 'success',
    hasSignText: '你已签到过，请于晚6点准时活动',
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