Page({
  data: {
    formId: ''
  },
  onLoad (option) {
    // 定义携带 ticket 的转发
    wx.showShareMenu({ withShareTicket: true })
  },
  onShow() {
  },
  shareBtnTap (e) {
    this.setData({formId: e.detail.formId || ''})
  },
  onShareAppMessage: function (res) {
    let { formId, userId } = this.data
    return {
      title: '分享标题',
      path: `/pages/share/index`,
      imageUrl: 'https://static.mobike.com/wx/fission_red_packet_bike_share2-ce13860c9d.png',
      success: function (res) {
        var shareTickets = res.shareTickets
        if (shareTickets && shareTickets.length !== 0) {
          console.log('encryptedData', res.encryptedData)
          console.log('iv', res.iv)
        }
      }
    }
  }
});
