Page({
  data: {
    iconSize: 70,
    iconColor: 'red',
    iconType: 'warn',
    text:'你尚未加入羽协\n请在招新时段报名!',
    btnText:'返回'
  },
  jumpBack: function () {
    wx.redirectTo({
      url:'../index/index'
    })
  },
})