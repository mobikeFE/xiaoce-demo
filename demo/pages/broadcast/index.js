const broadcast = require('../../libs/broadcast.js')

Page({
  data: {
    reg: false
  },
  onLoad (option) {
  },
  onShow() {
  },
  regEvent() {
    broadcast.on('eventA', function(data, eventName) {
      console.log('fire event :', eventName, data)
    })
    wx.showToast({
      title: '注册成功',
      icon: 'success'
    })
    this.setData({
      reg: true
    })
  },
  next() {
    wx.navigateTo({
      url: '/pages/broadcast_next/index'
    })
  }
});
