import * as echarts from '../../utils/ec-canvas/echarts'
var that = null

Component({
  properties:{
    date:null,
    machine:null,
    currentSonMachineTab:null
  },
  data: {
    ec: {
      onInit: function(canvas, width, height, dpr) {
        that.data.chart= echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr 
        });
        canvas.setChart(that.data.chart);
        that.data.chart.setOption(that.data.initOption);
        return that.data.chart;
      }
    },
    initOption :{
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
        trigger: 'axis',
        formatter:function(params){
          var app =getApp()
          var tempUrl=app.data.networkAddress+"user/nowMachineOutputSum";
          var tempDate=null
          switch(that.data.currentSonMachineTab){
            case 0:tempDate=app.getCurrenDay(params[0].dataIndex+1);break;
            case 1:tempDate=app.getCurrentWeek(params[0].dataIndex+1);break;
            case 2:tempDate=app.getCurrentMonth(params[0].dataIndex+1);break;
            case 3:tempDate=app.getCurrentYear(params[0].dataIndex+1);break;
          }

          var tempData={
            flag:that.data.currentSonMachineTab,
            nowTime:tempDate,
            machineid:that.data.machine.machineid              
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
                that.data.machine.yeild=res.data.data
                that.setData({
                  machine:that.data.machine
                })
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
          return params[0].name+"  "+params[0].data
        }
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
      }
    },
    chart:null,
  },
  methods: { 
    swichSonMachineNav: function (e) {
      var flag = e.target.dataset.current
      if (this.data.currentSonInformationTab === flag) {
        return false;
      } else {
        var myDetail = {
            index:3,
            flag:flag,
        }
        this.triggerEvent("swichSonMachineNav",myDetail)
      }
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
          if(!res.data.hasOwnProperty("code")){
            wx.showToast({  
              title: "网络错误",  
              icon: 'none',  
              duration: 2000,
            })
            return
          }

          //TODO:此处需要重新设计横坐标的标签
          if(res.data.code==1000){
            var tempData={
              flag:that.data.currentSonMachineTab,
              year:app.data.globalDate.getFullYear(),
              month:app.data.globalDate.getMonth()+1
            }
            var option = {
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: app.getLineXaisLabel(tempData),
              },
              series: [{
                symbol: 'none',
                type: 'line',
                smooth: true,
                data: res.data.data}]}
                that.data.chart.setOption(option);
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
  },

  created:function(){
    that = this
  },
})
