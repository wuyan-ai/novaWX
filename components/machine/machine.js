// var wxCharts = require('../../utils/wxcharts.js');
// var app = getApp();
// var lineChart = null;
// Component({
//   data: {
//     currentTab: 0,
//     machine_name:"设备1",
//     machine_id:1234567,
//     machine_network_status:"未联网",
//     machine_update_time:"2021-08-33",
//     machine_yeild_daily:"268kg",
//     machine_run_time:"28小时",
//     imgSrc:"/images/machine_offline.png"
// },
// methods: {
//   touchHandler: function (e) {
//     console.log(lineChart.getCurrentDataIndex(e));
//     lineChart.showToolTip(e, {
//         // background: '#7cb5ec',
//         format: function (item, category) {
//             return category + ' ' + item.name + ':' + item.data 
//         }
//     });
//   },  
//   swichNav: function (e) {
//     var that = this;
//     //TODO:此处发起网络请求，将返回的数据写入pageData列表,以及要修改折线图的Option并及时更新。
//     var data=["设备5","58484","已联网","2021-09-01","300kg","2小时"];
//     if (this.data.currentTab === e.target.dataset.current) {
//       this.changeViewData(this,data);
//       return false;
//     } else {
//       that.setData({
//         currentTab: e.target.dataset.current,
//       })
//       this.changeViewData(this,data);
//     }
//   },
//   changeViewData:function(that,data){
//     that.setData({machine_name:data[0],machine_id:data[1],machine_network_status:data[2],machine_update_time:data[3],machine_yeild_daily:data[4],machine_run_time:data[5]});
//     data[2]=="已联网"?that.setData({imgSrc:"/images/machine_online.png"}):that.setData({imgSrc:"/images/machine_offline.png"})
//   },  
//   createSimulationData: function () {
//       var categories = [];
//       var data = [];
//       for (var i = 0; i < 10; i++) {
//           categories.push('2016-' + (i + 1));
//           data.push(Math.random()*(20-10)+10);
//       }
//       // data[4] = null;
//       return {
//           categories: categories,
//           data: data
//       }
//   },
//   updateData: function () {
//       var simulationData = this.createSimulationData();
//       var series = [{
//           name: '成交量1',
//           data: simulationData.data,
//           format: function (val, name) {
//               return val.toFixed(2) + '万';
//           }
//       }];
//       lineChart.updateData({
//           categories: simulationData.categories,
//           series: series
//       });
//   },
//   onLoad: function (e) {
//       var windowWidth = 320;
//       try {
//           var res = wx.getSystemInfoSync();
//           windowWidth = res.windowWidth;
//       } catch (e) {
//           console.error('getSystemInfoSync failed!');
//       }
      
//       var simulationData = this.createSimulationData();
//       lineChart = new wxCharts({
//           canvasId: 'lineCanvas',
//           type: 'line',
//           categories: simulationData.categories,
//           animation: true,
//           // background: '#f5f5f5',
//           series: [{
//               name: '成交量1',
//               data: simulationData.data,
//               format: function (val, name) {
//                   return val.toFixed(2) + '万';
//               }
//           }, {
//               name: '成交量2',
//               data: [2, 0, 0, 3, null, 4, 0, 0, 2, 0],
//               format: function (val, name) {
//                   return val.toFixed(2) + '万';
//               }
//           }],
//           xAxis: {
//               disableGrid: true
//           },
//           yAxis: {
//               title: '成交金额 (万元)',
//               format: function (val) {
//                   return val.toFixed(2);
//               },
//               min: 0
//           },
//           width: windowWidth,
//           height: 200,
//           dataLabel: false,
//           dataPointShape: true,
//           extra: {
//               lineStyle: 'curve'
//           }
//       });
//   }
//   }
// })
