const broadcast = require('../../libs/broadcast.js')

Page({
  data: {
  },
  onLoad (option) {
  },
  onShow() {
  },
  fireEvent(data, eventName) {
  	broadcast.fire('eventA', 'I am the message')
  }
});
