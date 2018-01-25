Page({
  data: {
    signsuSize: 70,
    signsuColor: 'green',
    signsuType: 'success',
    signsuText: '报名成功',
    checkText: '签到',
    cancelText: '退报名',
    backText: '取消'
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