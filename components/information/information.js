import wxCharts from '../../utils/wxcharts';
var lineChart = null;
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
          lineData:{
            categories:[8,19,20],
            series :[{
                name: '成交量1',
                data: [53,99,22],
                format: function (val, name) {
                    return val.toFixed(2) + '万';
                }
            }]
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
        },
        touchHandler: function (e) {
          console.log(lineChart.getCurrentDataIndex(e));
          lineChart.showToolTip(e, {
              // background: '#7cb5ec',
              format: function (item, category) {
                  return category + ' ' + item.name + ':' + item.data 
              }
          });
        },    
        createSimulationData: function () {
          var categories = [];
          var data = [];
          for (var i = 0; i < 10; i++) {
              categories.push(i);
              data.push(Math.random()*(20-10)+10);
          }
          return {
              categories: categories,
              data: data
          }
        },
        //更新折线图数据，直接修改data.lineData即可
        updateData: function () {
          lineChart.updateData({
              categories: this.data.lineData.categories,
              series: this.data.lineData.series
          });
        },
        onLoad: function (e) {
          var windowWidth = 320;
          try {
              var res = wx.getSystemInfoSync();
              windowWidth = res.windowWidth;
          } catch (e) {
              console.error('getSystemInfoSync failed!');
          }
      
          lineChart = new wxCharts({
              canvasId: 'lineCanvas',
              type: 'line',
              categories: this.data.lineData.categories,
              animation: true,
              xAxis: {
                  disableGrid: true
              },
              series:this.data.lineData.series,
              yAxis: {
                  title: '成交金额 (万元)',
                  //数据格式化，保留小数点后两位
                  format: function (val) {
                      return val.toFixed(2);
                  },
                  min: 0
              },
              width: windowWidth,
              height: 200,
              dataLabel: false,
              dataPointShape: true,
              extra: {
                  lineStyle: 'curve'
              }
          });
        }
      }
});