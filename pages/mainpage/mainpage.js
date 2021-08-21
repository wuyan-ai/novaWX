Page({
  data: {
    currentSonMachineTab:0,
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
    machine:null,
    otherMachineList:null,
  },

  tabChange: function(e) {
    var app =getApp()
    var tempUrl=app.data.networkAddress;
    var tempData={"userid":app.data.userid}
    switch(e.detail.index){
      case 0:break;//暂不处理
      case 1:tempUrl+="user/machineList";break;
      case 2:break;//暂不处理
    }
    var that=this
    wx.request({
      url: tempUrl,
      data : tempData,
      header: {
        'content-type': 'application/json' 
      },
      method:"POST",
      success (res) {
        if(res.data.code==1000){
          switch(e.detail.index){
            case 0:break;//暂不处理
            case 1:{that.setData({machine:res.data.data[0]})
                    res.data.data.shift()
                    that.setData({otherMachineList:res.data.data})}break;
            case 2:break;
          }
        }
        else{
          wx.showToast({  
            title: res.data.msg,  
            icon: 'none',  
            duration: 2000  ,
          })
        }
      },
      fail(res){
        wx.showToast({  
          title: '网络错误，请检查网络',  
          icon: 'none',  
          duration: 2000  ,
        })
      }
    })
    this.setData({
      choose_index:e.detail.index,
    })
  },

  moreMachine:function(e){
    this.setData({
      choose_index:e.detail.index
    })
  },

  machineDetail:function(e){
    this.setData({
      choose_index:e.detail.index
    })
    this.oneMachineInfo(0)
  },

  swap:function(e){
    var index;
      for(index=0;index<this.data.otherMachineList.length;index++){
        if(this.data.otherMachineList[index].machineid==e.detail.id)
          break;
      }
      var temp=this.data.machine
      this.data.machine=this.data.otherMachineList[index]
      this.data.otherMachineList[index]=temp
      this.setData({
        machine:this.data.machine,
        otherMachineList:this.data.otherMachineList,
      })
  },

  swichSonMachineNav:function(e){
    if (this.data.currentSonMachineTab === e.detail.index) {
      return false;
    } else {
      this.oneMachineInfo(e.detail.index)
    }
  },

  oneMachineInfo:function(flag){
    var app = getApp()
    var that = this
    wx.request({
      url: app.data.networkAddress+"user/oneMachineInfo",
      data : {
        machineid: Number(that.data.machine.machineid),
        machineNum: that.data.machine.machineNum,
        flag: Number(flag),
        nowTime: "2021-08-14 21:13:21"
      },
      header: {
        'content-type': 'application/json' 
      },
      method:"POST",
      success (res) {
        if(res.data.code==1000){
          that.data.machine.output = res.data.data.output
          that.data.machine.machineWorkTime = res.data.data.machineWorkTime
          that.setData({
            machine:that.data.machine,
          })
          that.selectComponent("#machine").changeTips(flag)
          that.setData({
            currentSonMachineTab:flag
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
      fail(res){
        wx.showToast({  
          title: '网络错误，请检查网络',  
          icon: 'none',  
          duration: 2000  ,
        })
      }
    })
  }
  
})