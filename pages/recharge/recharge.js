Page({
  data: {
    rechargeText: '30元/10次，点击任意图片然后长按保存，打开相应APP扫一扫选择相册图片，转账时请务必备注学号',
    btnText: '返回',
    alipay: 'https://www.jdyx.club/tjyx_backend/image/alipay.jpg',
    wechat: 'https://www.jdyx.club/tjyx_backend/image/wechat.jpg',
  },
  saveAli: function () {
    wx.previewImage({
      current: this.data.alipay, // 当前显示图片的http链接
      urls: [this.data.alipay] // 需要预览的图片http链接列表
    })
  },
  saveWechat: function () {
    wx.previewImage({
      current: this.data.wechat, // 当前显示图片的http链接
      urls: [this.data.wechat] // 需要预览的图片http链接列表
    })
  },
  /*
  jumpSave: function () {
    var that = this;
    wx.downloadFile({
      url: that.data.img_url,
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            wx.showToast({
              title: '图片已保存在相册',
              icon: 'success',
              duration: 1000
            })
          },
          fail: function (res) {
            console.log(res)
            console.log('fail')
          }
        })
      },
      fail: function () {
        console.log('fail')
      }
    })
  },
  */
  jumpBack: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  },
})