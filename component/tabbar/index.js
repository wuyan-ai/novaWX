Component({
  data: {
    selected: 0,
    color: "#cdcdcd",
    selectedColor: "#2c2c2c",
    list: [{
      pagePath: "/pages/mainpage/information",
      iconPath: "/image/mainpage/information.png",
      selectedIconPath: "/image/mainpage/information_selected.png",
      text: "数据"
    }, {
      pagePath: "/pages/mainpage/machine/machine",
      iconPath: "/image/mainpage/account.png",
      selectedIconPath: "/image/mainpage/account_selected.png",
      text: "机器"
    },{
      pagePath: "/pages/mainpage/customer_service/customer_service",
      iconPath: "/image/mainpage/customer_service.png",
      selectedIconPath: "/image/mainpage/customer_service_selected.png",
      text: "客服"
    }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
        const data = e.currentTarget.dataset
        const url = data.path
        wx.switchTab({url})
        this.setData({
          selected: data.index
        })
    },
  }
})