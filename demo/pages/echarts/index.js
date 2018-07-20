import * as echarts from '../../components/ec-canvas/echarts';

let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    color: ['#f05b48', '#34b9c2', '#ffcc39'],
    legend: {
      data: ['经典版', '轻骑版', '三文鱼']
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['北京', '上海', '南京'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '经典版',
        type: 'bar',
        data: [300, 270, 340]
      },
      {
        name: '轻骑版',
        type: 'bar',
        data: [120, 102, 141]
      },
      {
        name: '三文鱼',
        type: 'bar',
        data: [200, 312, 231]
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart
    }
  }
});
