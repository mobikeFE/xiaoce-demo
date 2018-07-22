const {
  drawText,
  drawLine,
  drawDashLine,
  drawCanvas
} = require('../../utils/canvas')

Page({
  data: {
    x: [
      {date: '1月', value: 223},
      {date: '2月', value: 278},
      {date: '3月', value: 136},
      {date: '4月', value: 156},
      {date: '5月', value: 69},
      {date: '6月', value: 74},
      {date: '7月', value: 45}
    ]
  },
  onLoad (option) {
    var context = wx.createContext();
    // drawText(context, 'mobike', 0, 100, 18, 'red');
    // drawLine(context, 0, 18, 100, 18, 2, 'red');
    // drawDashLine(context, 0, 80, 80, 80, 10, 2, 'red');
    drawCanvas(context, this.data.x, 30, 350, 30, 40, [], '#EF5B49');
    wx.drawCanvas({
      canvasId: 'mobike',
      actions: context.getActions()
    });
  }
});
