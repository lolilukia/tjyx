const app = getApp()

Page({
  data: {
    realname: '',
    stunum: '',
    bindWarn: '',
    returnCode: ''
  },
  submitBind: function(e) {
    if(this.data.realname == '' || this.data.stunum == ''){
      this.setData({
        bindWarn: '信息不能为空！'
      });
      return;
    }
    var that = this;
    wx.login({
      success: function (res) {
        if(res.code){
          wx.request({
            url: 'https://www.jdyx.club/tjyx_backend/web/index.php?r=bind/bind',
            method: 'POST',
            header:{
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              code: res.code,
              realname: that.data.realname,
              stunum: that.data.stunum,
              nickname: app.globalData.userInfo.nickName
            },
            success: function(result){
              that.setData({
                returnCode: result.data.state
              });
              console.log(that.data.returnCode)
              //未加入羽协
              if (that.data.returnCode.indexOf('no register') != -1) {
                wx.redirectTo({
                  url: '../noReg/noReg',
                });
              }
              //绑定成功进行活动报名
              else if (that.data.returnCode.indexOf('success') != -1) {
                wx.redirectTo({
                  url: '../bsuccess/bsuccess',
                });
                wx.setStorage({
                  key: 'stuNum',
                  data: that.data.stunum
                })
              }
              else if (that.data.returnCode.indexOf('already bind') != -1) {
                wx.redirectTo({
                  url: '../bsuccess/bsuccess',
                });
                wx.setStorage({
                  key: 'stuNum',
                  data: that.data.stunum
                })
              }
              else {
                console.log(that.data.returnCode);
              }
            }
          })
        }
      }
    });
  },
  cancelBind: function(e){
    wx.redirectTo({
      url: '../index/index',
    });
  },
  inputName: function(e){
    this.setData({
      realname: e.detail.value
    });
  },
  inputNumber: function(e){
    this.setData({
      stunum: e.detail.value
    });
  }
})