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
        top: '8%', 
        width: '85%', 
        height: '80%',
        backgroundColor: 'rgb(250,250,250)',
      },
      tooltip: {
        show: true,
        trigger: 'item',
        position: function (point, params, dom, rect, size) {
        // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
        // 提示框位置
          var x = 0; // x坐标位置
          var y = 0; // y坐标位置

          // 当前鼠标位置
          var pointX = point[0];
          var pointY = point[1];
 
          // 外层div大小
          // var viewWidth = size.viewSize[0];
          // var viewHeight = size.viewSize[1];
 
         // 提示框大小
         var boxWidth = size.contentSize[0];
         var boxHeight = size.contentSize[1];
 
        // boxWidth > pointX 说明鼠标左边放不下提示框
        if (boxWidth > (pointX-35)) {
           x = 140;
        } else { // 左边放的下
           x = pointX - boxWidth-10;
        }

         // boxHeight > pointY 说明鼠标上边放不下提示框
        if (boxHeight > pointY) {
          y = 10;
        } else { // 上边放得下
          y = pointY - boxHeight;
        }
          return [x, y];
        },
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
          // return params[0].name
          switch(that.data.currentSonInformationTab){
            case 0:tempDate=params[0].dataIndex==24?"23:59:59":tempDate.split(" ")[1];break;
            case 1:{
              switch(Math.trunc(params[0].dataIndex/3)){
                case 0:tempDate="周一 "+tempDate.split(" ")[1];break;
                case 1:tempDate="周二 "+tempDate.split(" ")[1];;break;
                case 2:tempDate="周三 "+tempDate.split(" ")[1];;break;
                case 3:tempDate="周四 "+tempDate.split(" ")[1];;break;
                case 4:tempDate="周五 "+tempDate.split(" ")[1];;break;
                case 5:tempDate="周六 "+tempDate.split(" ")[1];;break;
                case 6:tempDate="周日 "+tempDate.split(" ")[1];;break;
                case 7:tempDate="周日 23:59:59";break;
              }
            }break;
            case 2:{
              var days = new Date(app.data.globalDate.getFullYear(),app.data.globalDate.getMonth(),0).getDate()
              tempDate=params[0].dataIndex==days?tempDate.slice(5,10)+"23:59:59":tempDate.slice(5)
            }break;
            case 3:{
              if(params[0].dataIndex==24){
                tempDate="12-" + 31 + " 23:59:59";
              }else{
                if(params[0].dataIndex%2==0)
                tempDate=Math.ceil((params[0].dataIndex+1)/2)+"-" + 1 + " 00:00:00";
              else
                tempDate=Math.ceil((params[0].dataIndex+1)/2)+"-" + 15 + " 00:00:00";
              }
            }break;
          }
          return tempDate
        },
        trigger: 'axis',
        axisPointer:{
                  type:'line',
                  lineStyle:{
                      color:'rgb(230,144,150)',
                      width:1,
                      type:'solid'
                  }
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          interval:0,//代表显示所有x轴标签显示
      },
        splitLine: {
          show: true,
          lineStyle:{
               type: 'solid',
          }
      },
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'solid'
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
      var index = Number(e.target.dataset.current)
      if (this.data.currentSonInformationTab === index) {
        return false;
      } else {
        var myDetail = {
            index:0,
            flag:index,
        }
        this.triggerEvent("swichSonInformationNav",myDetail)
      }
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
                data: app.getLineXaisLabel(tempData),
              },
              series: [{
                showSymbol: false,        //设置点击显示小圆点
                type: 'line',
                smooth: true,
                itemStyle : {
                  normal : {
                    color: "rgb(220,144,150)",     //设置小圆点颜色
                    lineStyle:{
                      color:'rgb(220,144,150)'
                    }
                  }
                },
                areaStyle:{
                  normal:{
                      //右，下，左，上
                      color:new echarts.graphic.LinearGradient(0,0,0,1,[
                          {
                              offset:0,
                              color:'rgb(220,144,150)'
                          },
                          {
                              offset:1,
                              color:'rgb(250,250,250)'
                          }
                      ],false) 
                  }
                },
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