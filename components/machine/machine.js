Component({
  data: {
    currentTab: 0,
    machine_name:"设备1",
    machine_id:1234567,
    machine_network_status:"未联网",
    machine_update_time:"2021-08-33",
    machine_yeild_daily:"268kg",
    machine_run_time:"28小时",
    imgSrc:"/images/machine_offline.png"
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
  }
}
})
