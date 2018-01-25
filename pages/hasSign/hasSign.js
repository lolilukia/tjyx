Page({
  data: {
    hasSignSize: 70,
    hasSignColor: 'green',
    hasSignType: 'success',
    hasSignText: '你已报名，可以签到了噢',
    stunum: '',
    actTime: '',
    order: '',
    timeText: '',
    orderText: '',
    returnCode: '',
    signText: '签到',
    cancelText: '退报名',
    backText: '取消',
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      actTime: options.time,
      order: options.order,
    })
    console.log(that.data.actTime);
    console.log(that.data.order);
    var tt = ('你报名的时段是'.concat(that.data.actTime)).concat('18:00-20:30');
    var ot = ('目前排在第'.concat(that.data.order)).concat('位');
    that.setData({
      timeText: tt,
      orderText: ot,
    })
  },
  jumpCheck: function () {
    wx.redirectTo({
      url: '../checkIn/checkIn'
    })
  },
  jumpCancel: function () {
    var that = this;
    wx.getStorage({
      key: 'stuNum',
      success: function (res) {
        that.setData({
          stunum: res.data
        })
        wx.request({
          url: 'https://www.jdyx.club/tjyx_backend/web/index.php?r=activity/cancel',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            stunum: that.data.stunum,
          },
          success: function (result) {
            that.setData({
              returnCode: result.data.state
            });
            if (that.data.returnCode.indexOf('fail') != -1) {
              wx.redirectTo({
                url: '../noSign/noSign',
              });
            }
            else if (that.data.returnCode.indexOf('success') != -1) {
              wx.redirectTo({
                url: '../cancel/cancel',
              });
            }
            else {
              console.log(that.data.returnCode);
            }
          }
        })
      }
    })
  },
  jumpBack: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  }
})