module.exports = {
  MOCK_POSITION: {latitude: 39.94932, longitude: 116.46792},
  MAP_POLYLINE: [{ "points": [{ "longitude": "116.467461", "latitude": "39.948226" }, { "longitude": "116.467526", "latitude": "39.947354" }, { "longitude": "116.469478", "latitude": "39.947658" }, { "longitude": "116.469436", "latitude": "39.948662" }, { "longitude": "116.467461", "latitude": "39.948226" }], "color": "#191d2180", "width": 6 }],
  MAP_CONTROLS: [{
    iconPath: '/images/pin.png',
    style: 'width: 40.2rpx;height: 72rpx;left: 50%;top: 50%;margin-left: -20.1rpx;margin-top: -28rpx'
  }, {
    iconPath: '/images/pos.png',
    style: 'width: 120rpx;height: 120rpx;left: 16rpx;bottom: 28rpx;',
    tap () {
      this.moveToLocation()
    }
  }],
  MAP_MARKERS: [{
    id: 0,
    latitude: 39.94898035435049,
    longitude: 116.46849721468611,
    width: 46,
    height: 46,
    iconPath: '/images/icon_mobike.png',
  }, {
    id: 1,
    latitude: 39.94798035435049,
    longitude: 116.46849721468611,
    width: 46,
    height: 46,
    iconPath: '/images/fencing.png',
    anchor: {
      x: 0.5,
      y: 0.5
    }
  }]
}
