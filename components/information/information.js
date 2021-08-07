import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    legend: {
      data: ['A'],
      top: 80,
      left: 'center',
      backgroundColor: 'white',
      z: 100
    },
    grid: {
      containLabel: true,
      top: 100,
      left:10,
      height: "150rpx"
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: 'A',
      type: 'line',
      smooth: true,
      color: 'red',  //线的颜色
      data: [18, 36, 65, 30, 100, 40, 33]
    }]
  };

  chart.setOption(option);
  return chart;
}

Component({
      /**
       * 组件的属性列表
       */
      properties: {
    
      },
    
      /**
       * 组件的初始数据
       */
      data: {
        ec: {
          onInit: initChart
        }
      },

});
