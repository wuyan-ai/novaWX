Page({
  data: {
    choose_index: 0,
    tabbar: {
      "color": "#cdcdcd",
      "selectedColor": "#2c2c2c",
      "borderStyle": "#dcdcdc",
      "backgroundColor": "#ffffff",
      "list": [{
          "key": "information",
          "iconPath": "/images/information.png",
          "selectedIconPath": "/images/information_selected.png",
          "text": "数据"
        },
        {
          "key": "machine",
          "iconPath": "/images/machine.png",
          "selectedIconPath": "/images/machine_selected.png",
          "text": "设备"
        },
        {
          "key": "customer_service",
          "iconPath": "/images/customer_service.png",
          "selectedIconPath": "/images/customer_service_selected.png",
          "text": "客服"
        }
      ]
    },
    machine:{
      machine_name:"设备1",
      machine_id:1234567,
      machine_network_status:"未联网",
      machine_update_time:"2021-08-33",
      machine_yeild_daily:"268kg",
      machine_run_time:"28小时",
      imgSrc:"/images/machine_offline.png"
    },
  },
    tabChange: function(e) {
      this.setData({
        choose_index:e.detail.index
      })
      },
      detail:function(e){
        this.setData({
          choose_index:3
        })
      },
      changeChooseIndex:function(e){
        //此处将发起网络请求，将得到的数据传入临时变量data中
        var data={
          imgSrc:e.detail.machineInfo.imgSrc,
          machine_name:e.detail.machineInfo.machine_name,
          machine_id:e.detail.machineInfo.machineID,
          machine_network_status:e.detail.machineInfo.machineStatus,
          machine_update_time:e.detail.machineInfo.machineUpdateTime,
          machine_yeild_daily:"512kg",
          machine_run_time:"2小时"
        }
        this.setData({
          choose_index:e.detail.index,
          machine:data
        })
      },
})