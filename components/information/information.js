import * as echarts from '../../utils/ec-canvas/echarts'
var that = null

Component({
  properties:{
    information:null,
    currentSonInformationTab: null,
    date:null
  },
  data: { 
    initOption:{
      grid:{
        show:'true',
        left: '10%',
        right:'5%',
        top: '5%', 
        width: '85%', 
        height: '85%',
        backgroundColor: 'rgb(250,250,250)',
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        formatter:function(params){
          var app =getApp()
          var tempUrl=app.data.networkAddress+"user/nowUserOutputSum";
          var tempDate=null
          switch(that.data.currentSonInformationTab){
            case 0:tempDate=app.getCurrenDay(params[0].dataIndex+1);break;
            case 1:tempDate=app.getCurrentWeek(params[0].dataIndex+1);break;
            case 2:tempDate=app.getCurrentMonth(params[0].dataIndex+1);break;
            case 3:tempDate=app.getCurrentYear(params[0].dataIndex+1);break;
          }

          var tempData={
            flag:that.data.currentSonInformationTab,
            nowTime:tempDate,
            userid:app.data.userid              
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
              if(res.data.code==1000){
                that.data.information.tips=res.data.data
                that.setData({
                  information:that.data.information
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
    ec: {
      onInit: function (canvas, width, height, dpr) {
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
  },

  
  methods: {
    swichSonInformationNav: function (e) {
      var myDetail={index:e.target.dataset.current}
      this.triggerEvent("swichSonInformationNav",myDetail)
    },  
  
    requestLineChartData:function(e){
      var app =getApp()
      var tempUrl=app.data.networkAddress+"user/mainpageOutputList";
      var tempData={
        flag:e.flag,
        nowTime:e.nowTime,
        userid:e.userid              
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

          if(res.data.code==1000){   
            var tempData={
              flag:that.data.currentSonInformationTab,
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
    },
  },

  created:function(){
    that = this
  },
});