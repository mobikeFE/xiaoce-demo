Page({
  data: {
    isQuickLogin: true,
    quickLoginText: '微信用户快速登录',
    smsLoginText: '输入手机号码登录/注册',
    btnText: '开始',
    isProtocol: false
  },
  onLoad (option) {
  },
  onShow() {
  },
  goToMbkLogin: function goToMbkLogin(e) {
    this.setData({
      isQuickLogin: false
    });
  },
  getPhoneNumber: function getPhoneNumber(e) {
    console.log(e)
  },
  onLoginSubmitTap: function onLoginSubmitTap() {
    // 确认登录
  }
});
