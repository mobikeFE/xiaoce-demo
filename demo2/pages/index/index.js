Page({
  data: {
    isQuickLogin: true,
    quickLoginText: '微信用户快速登录',
    smsLoginText: '输入手机号码登录/注册',
    btnText: '开始',
    isProtocol: false
  },
  onLoad (option) {
    wx.checkSession({
      success: function(){
        console.log('checkSession success')
        console.log(arguments)
      },
      fail: function(){
        console.log('checkSession fail')
        console.log(arguments)
      }
    })
  },
  onShow() {
  },
  bingGetUserInfo (){
    console.log(arguments)
  },
  getCode () {
    wx.login({
      success: function(res) {
        if (res.code) {
          console.log(res.code)
        }
      }
    })
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
