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
    machine:null
  },
  data: {
    currentTab: 0,
    tips:"本日产量",
    date:"2021年5月1号",
    yeild:"1234kg",
    ec: {
      onInit: initChart
    }
  },
  methods: { 
    swichNav: function (e) {
  
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
      switch(this.data.currentTab){
        case "0":this.setData({tips:"本日"}); break
        case "1":this.setData({tips:"本周"}); break
        case "2":this.setData({tips:"本月"}); break
        case "3":this.setData({tips:"本年"}); break
      }
    }
    },

    detail:function(){
      var myDetail={index:1}
      this.triggerEvent("changeChooseIndex",myDetail)
     }
  }
})
