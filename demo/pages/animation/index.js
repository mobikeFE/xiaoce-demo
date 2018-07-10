const tips = [
  ['曾经梦想', '做超级英雄', '拯救地球'],
  ['不要让英雄梦只是梦想', '变身吧摩拜侠', '你就是环保英雄']
]

Page({
  data: {
    flag: true,
    loadedNum: 0,
    exsit: false,
    ended: false,
    tips: tips,
    aniBody: {},
    aniHero: {},
    aniFog: {},
    aniTips1: {},
    aniTips2: {},
    aniBike: {},
    aniBoyBike: {},
    aniBoyHero: {},
    aniBigHero: {},
    aniText: {},
    aniFogL: {}
  },
  onLoad (option) {
  },
  onShow() {
  },
  init () {
    // 避免短时间连续调用
    if (this.data.exsit || this.data.loadedNum < 10) return
    if (this.timer) clearTimeout(this.timer)
    this.startMusic()
    this.setData({
      exsit: true,
      ended: false
    })
    let optionDefault1 = {
      duration: 1000,
      timingFunction: 'linear'
    }
    let optionDefault2 = {
      duration: 700,
      timingFunction: 'linear'
    }
    let optionDefault3 = {
      duration: 1500,
      timingFunction: 'linear'
    }
    let optionDefault4 = {
      duration: 2000,
      timingFunction: 'linear'
    }
    const aniBoy = wx.createAnimation(optionDefault1)
    const aniHero = wx.createAnimation(optionDefault1)
    const aniFog = wx.createAnimation(optionDefault3)
    const aniTips1 = wx.createAnimation(optionDefault1)
    const aniTips2 = wx.createAnimation(optionDefault1)
    const aniBike = wx.createAnimation(optionDefault1)
    const aniBoyBike = wx.createAnimation(optionDefault2)
    const aniBoyHero = wx.createAnimation(optionDefault2)
    const aniBigHero = wx.createAnimation(optionDefault1)
    const aniText = wx.createAnimation(optionDefault1)
    const aniFogL = wx.createAnimation(optionDefault4)

    aniBoy.opacity(0).step({delay: 7500, during: 500})
    aniFog.opacity(1).step({during: 1000})
    aniFog.opacity(0).translateY(300).step({delay: 3100, during: 1500}) // 4.1-5.5s 车雾同时淡出

    // aniFog.opacity(1).translateY(0).step({during: 3000})
    // aniFog.opacity(0.3).translateY(-100).step({during: 1500})
    aniFogL.opacity(1).translateY(100).step({delay: 14500, during: 5000}) // 与英雄同时淡入
    aniFogL.opacity(0).translateY(0).step({during: 3000})

    aniHero.opacity(1).step({delay: 600, during: 1000})
    aniHero.opacity(0).step({delay: 1900, during: 500})

    aniBike.opacity(1).step({delay: 4100, during: 1400})
    aniBike.opacity(0).step({delay: 2700, during: 700}) // 8.2

    aniTips1.opacity(1).step({delay: 1500, during: 1000})
    aniTips1.opacity(0).step({delay: 2500, during: 1000})
    aniTips2.opacity(1).step({delay: 6100, during: 1000})
    aniTips2.opacity(0).step({delay: 1500, during: 1000})

    aniBoyBike.opacity(1).step({delay: 9000, during: 500})
    aniBoyBike.opacity(0).step({delay: 0, during: 500})
    aniBoyBike.translateY(140).scale(0.7).step({delay: 0, during: 0})
    aniBoyBike.opacity(1).step({during: 500})
    aniBoyBike.opacity(0).step({during: 500})

    // 此处后延 2s
    aniBoyHero.opacity(1).step({delay: 12800, during: 900})
    aniBoyHero.opacity(0).step({during: 900})
    aniBoyHero.translateY(-200).scale(0.6).step({during: 0})
    aniBoyHero.opacity(1).step({during: 500})
    aniBoyHero.opacity(0).step({delay: 0, during: 500})

    aniBigHero.opacity(1).translateX(-7).step({delay: 16200, during: 1000}) // 后延 1s
    aniText.opacity(1).step({delay: 17500, during: 1500})

    this.setData({
      aniBoy: aniBoy,
      aniHero: aniHero.export(),
      aniFog: aniFog.export(),
      aniTips1: aniTips1.export(),
      aniTips2: aniTips2.export(),
      aniBike: aniBike.export(),
      aniBoyBike: aniBoyBike.export(),
      aniBoyHero: aniBoyHero.export(),
      aniBigHero: aniBigHero.export(),
      aniText: aniText.export(),
      aniFogL: aniFogL.export()
    })

    const that = this
    that.timer = setTimeout(() => {
      this.stopMusic()
      clearTimeout(that.timer)
      that.setData({
        ended: true,
        exsit: false
      })
      that.timer = 0
    }, 20000)
  },
  loaded(e) {
    let loadedNum = this.data.loadedNum || 0
    this.setData({loadedNum: ++loadedNum})
    if (this.data.loadedNum >= 10 && !this.data.exsit) {
      this.init()
    }
  },
  reset() {
    this.stopMusic()
    if (this.timer) clearTimeout(this.timer)
    this.timer = 0
    this.setData({
      ended: true,
      exsit: false
    })
  },
  skipToEnd() {
    this.reset()
  },
  startMusic () {
    if (this.data.ended) return
    wx.playBackgroundAudio({
      dataUrl: 'https://static.mobike.com/wx/gr_music.mp3'
    })
    this.setData({music: true})
  },
  stopMusic () {
    wx.stopBackgroundAudio()
  }
});
