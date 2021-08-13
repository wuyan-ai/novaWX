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
    }
  },
    tabChange: function(e) {
      // var key = e.detail.key
      // if (key == 'new') {
      //   wx.navigateTo({
      //     url: '/pages/new/new',
      //   })
      // } else
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
        this.setData({
          choose_index:e.detail.index
        })
      }
})