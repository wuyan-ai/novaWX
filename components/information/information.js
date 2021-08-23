import * as echarts from '../../utils/ec-canvas/echarts'
var option = {
  title: {
    left: 'center'
  },
  legend: {
    top: 220,
    left: 'center',
  },
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
  yAxis: {
    x: 'center',
    type: 'value',
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  series: [{
    name: 'A',
    type: 'line',
    smooth: true,
    data: [18, 36, 65, 30, 78, 40, 33]
  }]
};
var chart = null
function initChart(canvas, width, height, dpr) {
  chart= echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  chart.setOption(option);
  return chart;
}

Component({
  properties:{
    information:null,
    currentSonInformationTab: null,
    date:null
  },
  data: {
      
      date:"2021年5月1号",
      ec: {
        onInit: initChart
      }
  },
  methods: {
    swichSonInformationNav: function (e) {
      var myDetail={index:e.target.dataset.current}
      this.triggerEvent("swichSonInformationNav",myDetail)
    },  
  
  }
});