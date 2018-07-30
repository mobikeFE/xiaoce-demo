function drawText(
  context, 
  text, 
  x, 
  y, 
  size, 
  color
) {
  context.beginPath();
  context.setFontSize(size);
  context.setFillStyle(color);
  if (x instanceof Array) {
    text.forEach(function(item, index) {
      context.fillText(item, x[index], y);
    });
  } else if (y instanceof Array) {
    text.forEach(function(item, index) {
      context.fillText(item, x, y[index]);
    });
  } else {
    context.fillText(text, x, y);
  }
  context.closePath();
  context.stroke();
}

function drawLine(
  context, 
  x, 
  y, 
  x1, 
  y1, 
  width, 
  color
){ 
  context.beginPath(); 
  context.setStrokeStyle(color);
  context.setLineWidth(width);  
  context.moveTo(x, y);  
  context.lineTo(x1, y1);  
  context.stroke(); 
}

function drawDashLine(
  context, 
  x1, 
  y1, 
  x2, 
  y2, 
  dashLength,
  width,
  color
){
  context.beginPath();
  context.setStrokeStyle(color);
  context.setLineWidth(width);
  //得到横向的宽度;
  var xpos = x2 - x1; 

  //得到纵向的高度;
  var ypos = y2 - y1; 

  // 分几段
  // Math.sqrt() 函数返回一个数的平方根
  // Math.floor() 返回小于或等于一个给定数字的最大整数
  var numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLength); 

  // 利用正切获取斜边的长度除以虚线长度，得到一共可分为多少段
  for(var i = 0; i < numDashes; i++){
    if(i % 2 === 0){
      // 有了横向的宽度和分为多少段，得出每一段的长，起点 + 每段长度 * i，终点 + 每段长度 * i
      context.moveTo(x1 + (xpos/numDashes) * i, y1 + (ypos/numDashes) * i); 
    } else {
      context.lineTo(x1 + (xpos/numDashes) * i, y1 + (ypos/numDashes) * i);
    }
  }
  context.closePath();
  context.stroke();
}


function drawDynamicLine(
  context,
  x,
  y,
  x1,
  y1,
  width,
  color,
  timer
){
  var temp = y; 
  setTimeout(function (){
    if(temp > y1){
      drawLine(context, x, temp, x1, temp - 1,width, color);
      wx.drawCanvas({
        canvasId: 'mobike',
        actions: context.getActions(),
        reserve:true
      });
      temp--;
      drawDynamicLine(context, x, temp, x1, y1, width, color, timer);
    }
  }, timer);
}

function drawCanvas(
  context, 
  datas, 
  startX, 
  startY, 
  eachSpacing_x, 
  eachSpacing_y, 
  points, 
  colors
){
  var xLabels = [];
  var yLabels = [];
  var xVals = [];
  var yVals = [];
  var yRange = 0;
  var points_jj = [];

  // 循环数据数组
  datas.forEach(function(item, index) {
    // 数据对象里面是 date
    xLabels.push(item.date);

    // 数组 push，index 从 0 开始
    // 30 + (index + 1) * 30
    xVals.push(startX + (index +1) * eachSpacing_x);

    // 350 - item.value * 40 / 100
    // 350 - 223 * 40 / 100 ==> 260.8
    // 350 - 278 * 40 / 100 ==> 238.8
    // 350 - 136 * 40 / 100 ==> 295.6
    // ...
    yVals.push(startY - item.value * eachSpacing_y / 100);


    points.push(startX + (index +1) * eachSpacing_x);
    points_jj.push(startY - item.value * eachSpacing_y/100);

    // 如果小于 item.value 就重置一下
    if(yRange < item.value){
      yRange = item.value;
    }
  })

  // 绘制横轴
  drawLine(context, startX, startY, 280, startY, 2, "#cccccc");

  // 绘制横轴上的文本
  drawText(context, xLabels, xVals, startY + 15, 12, 'black');

  // 下舍入
  // Math.floor(yRange/100) ==> 2
  // yRange 是 300
  yRange = (Math.floor(yRange/100) + 1) * 100;
  
  // 350 - (300/100) * 40 ==> 230
  var endY = startY - (yRange/100) * eachSpacing_y;

  // 绘制纵轴
  drawLine(context, startX, startY, startX, endY, 2, "#cccccc");

  var yVals = [];
  for(var i = 0; i < datas.length; i++){
    if(i <= (yRange/100)){
      // eachSpacing_y ==> 40
      yVals.push(startY - eachSpacing_y * i + 4);
    }
  }

  yVals.forEach(function(item, index) {
    yLabels.push(index * 100);
  });

  // 绘制纵轴上的文本
  drawText(context, yLabels, startX - 26, yVals, 12, 'black');


  for(var i = 0; i < datas.length; i++){
    drawDynamicLine(context, points[i] + i * 3, startY, points[i] + i * 3, points_jj[i], 12,'#EF5B49',5);
  }
}

module.exports = {
  drawText,
  drawLine,
  drawDashLine,
  drawCanvas
}
