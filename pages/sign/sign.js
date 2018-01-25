const date = new Date()
const weekday = date.getDay()
const times = []

times.push('18:00-20:30')

Page({
  data: {
    times: times,
    value: [0],
    signText: '请选择时段：',
    signBtnText: '确认报名',
    cancelBtnText: '取消',
    stuNum: '',
    returnCode: '',
    restTime: ''
  },
  bindChange: function (e) {
    const val = e.detail.value
  },
  jumpSign: function(){
    var date = new Date();
    var today = date.getDay();
    var hours = date.getHours();
    var mins = date.getMinutes();
    if (today < 1 || today > 4 || (today == 1 && hours < 17) || (today == 3 && hours < 17) || (today == 2 && hours > 20) || (today == 2 && hours == 20 && mins > 30) || (today == 4 && hours > 20) || (today == 4 && hours == 20 && mins > 30)) {
      wx.redirectTo({
        url: '../timeError/timeError'
      })
    }
    else {
      var that = this;
      wx.getStorage({
        key: 'stuNum',
        success: function (res) {
          that.setData({
            stuNum: res.data
          })
          wx.request({
            url: 'https://www.jdyx.club/tjyx_backend/web/index.php?r=activity/act',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              stunum: that.data.stuNum,
            },
            success: function (result) {
              that.setData({
                returnCode: result.data.state,
                restTime: result.data.detail
              });
              console.log(that.data.returnCode)
              if (that.data.returnCode.indexOf('timeError') != -1) {
                wx.redirectTo({
                  url: '../timeError/timeError',
                });
              }
              else if (that.data.returnCode.indexOf('hasSign') != -1){
                wx.redirectTo({
                  url: '../hasSign/hasSign?time=' + that.data.restTime[0] +'&order=' + that.data.restTime[1],
                });
              }
              else if (that.data.returnCode.indexOf('success') != -1) {
                wx.redirectTo({
                  url: '../signSuccess/signSuccess?restTime=' + that.data.restTime[0] + '&order=' + that.data.restTime[1],
                });
              }
              else {
                console.log(that.data.returnCode);
              }
            }
          })
        }
      })
    } 
  },
  jumpCancel: function(e){
    wx.redirectTo({
      url: '../index/index'
    })
  }
})