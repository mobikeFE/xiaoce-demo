const {
  MOCK_POSITION,
  MAP_POLYLINE,
  MAP_CONTROLS,
  MAP_MARKERS
} = require('./mock')

Page({
  data: {
    scale: 18,
    controls: '',
    markers: MAP_MARKERS,
    polyline: MAP_POLYLINE,
    mapCenter: MOCK_POSITION,
    mapStyle: 'width:750rpx;height:100vh;',
    tabs: ['单车', '电单车'],
    itemWidth: 50,
    activeTab: 0
  },
  onLoad (option) {
  },
  onShow() {
    this.setData({
      controls: MAP_CONTROLS
    })
    if (this.data.tabs.length != 2) {
      this.setData({
        itemWidth: 100 / this.data.tabs.length
      })
    }
  },
  onReady() {
    this.mapCtx = wx.createMapContext('map')
  },
  markertap(e) {
    const markerId = e.markerId
    const marker = this.data.markers[markerId]
    console.log('[markertap]', marker)
  },
  regionchange(e) {
    var that = this
    if (e.type == 'end') {
      // 获取地图视野中心点经纬度
      that.mapCtx.getCenterLocation({
        success (res) {
          console.log('center locatioin', res)
        }
      })
    }
  },
  onControlTap(e) {
    let idx = e.currentTarget.dataset.idx
    let callback = this.data.controls[idx].tap
    callback && callback.call(this)
  },
  moveToLocation() {
    this.mapCtx.moveToLocation()
  },
  onTabTap(e) {
    const idx = e.currentTarget.dataset.idx;
    if (idx !== this.data.activeTab) {
      this.setData({
        activeTab: idx
      })
    }
  }
});
