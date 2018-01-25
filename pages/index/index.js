//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    stunum: '',
    returnCode: '',
    actTime: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  jumpToBind: function() {
    wx.redirectTo({
      url: '../bind/bind'
    })
  },
  jumpToSign: function() {
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
                url: '../hasSign/hasSign?time=' + that.data.actTime[0] + '&order=' + that.data.actTime[1],
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
  jumpToRecharge: function () {
    wx.redirectTo({
      url: '../recharge/recharge'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
