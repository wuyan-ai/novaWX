import wxCharts from '../../utils/wxcharts.js';
var app = getApp();
var lineChart = null;
Component({
  properties:{
    machine:null
  },
  data: {
    currentTab: 0,
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
    var data=["设备5","58484","已联网","2021-09-01","300kg","2小时"];
    if (this.data.currentTab === e.target.dataset.current) {
      this.changeViewData(this,data);
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
      this.changeViewData(this,data);
    }
  },
  changeViewData:function(that,data){
    that.setData({machine_name:data[0],machine_id:data[1],machine_network_status:data[2],machine_update_time:data[3],machine_yeild_daily:data[4],machine_run_time:data[5]});
    data[2]=="已联网"?that.setData({imgSrc:"/images/machine_online.png"}):that.setData({imgSrc:"/images/machine_offline.png"})
  },  
  detail:function(){
    var myDetail={index:3}
    this.triggerEvent("changeChooseIndex",myDetail)
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
})
