Page({
  data: {
    stErrorSize: 70,
    stErrorColor: 'green',
    stErrorType: 'waiting',
    stErrorText: '请在以下时段签到',
    retryText: '重试',
    timeText: '',
    stunum: '',
    returnCode: ''
  },
  onLoad: function () {
    var date = new Date();
    var today = date.getDay();
    switch (today) {
      case 0:
        var str = this.GetDateStr(2) + ' 17:30 - ' + this.GetDateStr(2) + ' 20:30'
        this.setData({
          timeText: str
        })
        break;
      case 1:
        var str = this.GetDateStr(1) + ' 17:30 - ' + this.GetDateStr(1) + ' 20:30'
        this.setData({
          timeText: str
        })
        break;
      case 2:
        var str = this.GetDateStr(0) + ' 20:30前'
        this.setData({
          timeText: str
        })
        break;
      case 3:
        var str = this.GetDateStr(1) + ' 17:30 - ' + this.GetDateStr(1) + ' 20:30'
        this.setData({
          timeText: str
        })
        break;
      case 4:
        var str = this.GetDateStr(0) + ' 20:30前'
        this.setData({
          timeText: str
        })
        break;
      case 5:
        var str = this.GetDateStr(4) + ' 17:30 - ' + this.GetDateStr(4) + ' 20:30'
        this.setData({
          timeText: str
        })
        break;
      case 6:
        var str = this.GetDateStr(3) + ' 17:30 - ' + this.GetDateStr(3) + ' 20:30'
        this.setData({
          timeText: str
        })
        break;
    }
  },
  GetDateStr: function (AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期  
    var y = dd.getFullYear();
    var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0  
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0  
    return y + "-" + m + "-" + d;
  },
  jumpRetry: function () {
    var that = this;
    wx.getStorage({
      key: 'stuNum',
      success: function (res) {
        that.setData({
          stunum: res.data
        })
        wx.request({
          url: 'https://www.jdyx.club/tjyx_backend/web/index.php?r=sign/sign',
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
            if (that.data.returnCode.indexOf('hasCheck') != -1) {
              wx.redirectTo({
                url: '../hasCheck/hasCheck',
              });
            }
            else if (that.data.returnCode.indexOf('noSign') != -1) {
              wx.redirectTo({
                url: '../noSign/noSign',
              });
            }
            else if (that.data.returnCode.indexOf('signTimeError') != -1) {
              wx.redirectTo({
                url: '../signTimeError/signTimeError',
              });
            }
            else if (that.data.returnCode.indexOf('insufficient') != -1) {
              wx.redirectTo({
                url: '../insufficient/insufficient',
              });
            }
            else if (that.data.returnCode.indexOf('success') != -1) {
              wx.redirectTo({
                url: '../checkIn/checkIn',
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