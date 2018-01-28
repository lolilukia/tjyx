Page({
  data: {
    tErrorSize: 70,
    tErrorColor: 'green',
    tErrorType: 'waiting',
    tErrorText: '请在以下时段报名',
    retryText: '重试',
    timeText: ''
  },
  onLoad: function() {
    var date = new Date(); 
    var today = date.getDay();
    switch(today){
      case 0:
        var str = this.GetDateStr(1) + ' 17:00 - ' + this.GetDateStr(2) + ' 20:30'
        this.setData({
          timeText: str
        })
        break;
      case 1:
        var str = this.GetDateStr(0) + ' 17:00 - ' + this.GetDateStr(1) + ' 20:30'
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
        var str = this.GetDateStr(0) + ' 17:00 - ' + this.GetDateStr(1) + ' 20:30'
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
        var str = this.GetDateStr(3) + ' 17:00 - ' + this.GetDateStr(4) + ' 20:30'
        this.setData({
          timeText: str
        })
        break;
      case 6:
        var str = this.GetDateStr(2) + ' 17:00 - ' + this.GetDateStr(3) + ' 20:30'
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
    wx.redirectTo({
      url: '../sign/sign'
    })
  },
})