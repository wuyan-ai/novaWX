var app = getApp();
Component({ 
  data: {
    selected: app.globalData.selected,
    color: "#cdcdcd",
    selectedColor: "#2c2c2c",
    list: [{
      pagePath: "/pages/mainpage/information",
      iconPath: "/image/mainpage/information.png",
      selectedIconPath: "/image/mainpage/information_selected.png",
      text: "数据",
      path:"/pages/mainpage/information/information",
      urlpath: "/pages/mainpage/information/information",

    }, {
      pagePath: "/pages/mainpage/machine/machine",
      iconPath: "/image/mainpage/account.png",
      selectedIconPath: "/image/mainpage/account_selected.png",
      text: "机器",
      urlpath: "/pages/mainpage/machine/machine",
    },{
      pagePath: "/pages/mainpage/customer_service/customer_service",
      iconPath: "/image/mainpage/customer_service.png",
      selectedIconPath: "/image/mainpage/customer_service_selected.png",
      text: "客服",
      urlpath: "/pages/mainpage/customer_service/customer_service",
    }
    ]
  },
  attached() {

  },
  methods: {
    switchTab(e) {
        const data = e.currentTarget.dataset
        app.globalData.selected= data.index
        this.setData({
          selected: app.globalData.selected
        })
        var temp=data.index
        let datas = this.data.list
        
        wx.navigateTo({
          url: datas[temp].urlpath,
        })
    },
  }
})