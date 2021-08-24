import * as echarts from '../../utils/ec-canvas/echarts'
var initOption = {
  grid:{
    show:'true',
    left: '10%',
    right:'5%',
    top: '5%', 
    width: '85%', 
    height: '85%'
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
    type: 'value',
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
};
var chart = null
function initChart(canvas, width, height, dpr) {
  chart= echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr 
  });
  canvas.setChart(chart);
  chart.setOption(initOption);
  return chart;
}
Component({
  properties:{
    date:null,
    machine:null,
    currentSonMachineTab:null
  },
  data: {
    tips:"本日",
    yeild:"1234kg",
    ec: {
      onInit: initChart
    }
  },
  methods: { 
    swichSonMachineNav: function (e) {
      var myDetail={index:e.target.dataset.current}
      this.triggerEvent("swichSonMachineNav",myDetail)
    },

    moreMachine:function(){
      var myDetail={index:1}
      this.triggerEvent("moreMachine",myDetail)
     },

     requestLineChartData:function(e){
      var app =getApp()
      var tempUrl=app.data.networkAddress+"user/oneOutputList";
      var tempData={
        flag:e.flag,
        nowTime:e.nowTime,
        machineIdAndNum: e.machineInfo                
      }
      wx.request({
        url: tempUrl,
        data : tempData,
        header: {
          'content-type': 'application/json' 
        },
        method:"POST",
        success (res) {
          // 此处屏蔽了系统错误
          if(!res.data.hasOwnProperty("code")){
            wx.showToast({  
              title: "网络错误",  
              icon: 'none',  
              duration: 2000,
            })
            return
          }
          if(res.data.code==1000){
            switch(e.flag){
              case 0:var xAxisData=['0.00','1.00','2.00','3.00','4.00','5.00','6.00','7.00','8.00','9.00','10.00','11.00','12.00','13.00','14.00','15.00','16.00','17.00','18.00','19.00','20.00','21.00','22.00','23.00'];break
              case 1:var xAxisData=['周一', '周二', '周三', '周四', '周五', '周六', '周日'];break
              case 2:var xAxisData=[];break
              case 3:var xAxisData=['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];break
            }
            var option = {
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xAxisData,
              },
              series: [{
                symbol: 'none',
                type: 'line',
                smooth: true,
                data: res.data.data}]}
                // data: ['12','23','234','33','45','16']}]}
              chart.setOption(option);
          }
          else{
            wx.showToast({  
              title: res.data.msg,  
              icon: 'none',  
              duration: 2000  ,
            })
          }
        },
        fail(){
          wx.showToast({  
            title: '未连接网络',  
            icon: 'none',  
            duration: 2000  ,
          })
        }
      })
    }
  }
})
