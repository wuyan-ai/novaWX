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
      // z: 100
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
      data: {
          currentTab: 0,
          tips_left1:"本日产量",
          tips_left2:"本日产率",
          tips_left3:"本日节省",
          tips1:"0吨",
          tips2:"0%",
          tips3:"0%",
          tips4:"0%",
          tips5:"￥0",
          tips6:"0%",
          pageData:["1512吨","20%","83.6%","95%","￥32,618","100%"],
          ec: {
            onInit: initChart
          }
      },
      methods: {
        swichNav: function (e) {
          var that = this;
          //TODO:此处发起网络请求，将返回的数据写入pageData列表,以及要修改折线图的Option并及时更新。
         
          if (this.data.currentTab === e.target.dataset.current) {
            this.changeViewData(this,this.data.currentTab,this.data.pageData);
            return false;
          } else {
            that.setData({
              currentTab: e.target.dataset.current,
            })
            this.changeViewData(this,this.data.currentTab,this.data.pageData);
          }
        },  
        changeViewData:function(that,currentTab,data) {
          switch(currentTab){
            case "0":that.setData({tips_left1:"本日产量",tips_left2:"本日产率",tips_left3:"本日节省"});break;
            case "1":that.setData({tips_left1:"本周产量",tips_left2:"本周产率",tips_left3:"本周节省"});break;
            case "2":that.setData({tips_left1:"本月产量",tips_left2:"本月产率",tips_left3:"本月节省"});break;
            case "3":that.setData({tips_left1:"本年产量",tips_left2:"本年产率",tips_left3:"本年节省"});break;
          }
          that.setData({
            tips1:data[0],
            tips2:data[1],
            tips3:data[2],
            tips4:data[3],
            tips5:data[4],
            tips6:data[5]
          })
        }
      }
});
