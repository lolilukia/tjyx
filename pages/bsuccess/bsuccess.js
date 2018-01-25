Page({
  data: {
    bsuSize: 70,
    bsuColor: 'green',
    bsuType: 'success',
    bsuText: '您已进行账号绑定\n可以报名活动了噢',
    bsubText: '报名',
    stunum: ''
  },
  jumpSign: function () {
    var that = this;
    wx.getStorage({
      key: 'stuNum',
      success: function (res) {
        that.setData({
          stunum: res.data
        })
        wx.request({
          url: 'https://www.jdyx.club/tjyx_backend/web/index.php?r=activity/judge',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            stunum: that.data.stunum,
          },
          success: function (result) {
            that.setData({
              returnCode: result.data.state,
              actTime: result.data.detail
            });
            console.log(that.data.returnCode)
            if (that.data.returnCode.indexOf('noReg') != -1) {
              wx.redirectTo({
                url: '../noReg/noReg',
              });
            }
            else if (that.data.returnCode.indexOf('noBind') != -1) {
              wx.redirectTo({
                url: '../noBind/noBind',
              });
            }
            else if (that.data.returnCode.indexOf('hasSign') != -1) {
              wx.redirectTo({
                url: '../hasSign/hasSign?time=' + actTime[0] + '&order=' + actTime[1],
              });
            }
            else if (that.data.returnCode.indexOf('timeError') != -1) {
              wx.redirectTo({
                url: '../timeError/timeError',
              });
            }
            else if (that.data.returnCode.indexOf('ok') != -1) {
              wx.redirectTo({
                url: '../sign/sign',
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
})