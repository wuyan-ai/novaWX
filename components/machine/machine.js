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
    var that = this;
    //TODO:此处发起网络请求，将返回的数据写入pageData列表,以及要修改折线图的Option并及时更新。
    var data=["设备5","58484","已联网","2021-09-01","300kg","2小时"];
    console.log(e)
    if (this.data.currentTab === e.target.dataset.current) {
      this.changeViewData(this,data);
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
      this.changeViewData(this,data);
      switch(this.data.currentTab){
        case "0":this.setData({tips:"本日"}); break
        case "1":this.setData({tips:"本周"}); break
        case "2":this.setData({tips:"本月"}); break
        case "3":this.setData({tips:"本年"}); break
      }
    }
    },
    changeViewData:function(that,data){
    that.setData({machine_name:data[0],machine_id:data[1],machine_network_status:data[2],machine_update_time:data[3],machine_yeild_daily:data[4],machine_run_time:data[5]});
    data[2]=="已联网"?that.setData({imgSrc:"/images/machine_online.png"}):that.setData({imgSrc:"/images/machine_offline.png"})
    },  
    detail:function(){
      var myDetail={index:3}
      this.triggerEvent("changeChooseIndex",myDetail)
     }
  }
})
