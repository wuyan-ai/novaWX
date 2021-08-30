var app =getApp()
Page({
  data: {
    currentSonMachineTab:0,
    currentSonInformationTab:0,
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
    date:app.data.globalDate,
    information:null,
  },

  tabChange: function(e) {

    var tempUrl=app.data.networkAddress;
    var tempData={userid:app.data.userid}
    switch(e.detail.index){
      case 0:{
        tempData.nowTime=this.generateDate()
        tempData.flag=e.detail.flag
        tempUrl+="user/upUserInfo"
      }break;
      case 1:tempUrl+="user/machineList";break;
      case 2:this.setData({choose_index:2});return;
      case 3:{
        tempUrl+="user/oneMachineInfo"
        tempData={
          machineid: Number(this.data.machine.machineid),
          machineNum: this.data.machine.machineNum,
          flag: Number(e.detail.flag),
          nowTime: this.generateDate()
        }
        var temp={
          flag:tempData.flag,
          nowTime:tempData.nowTime,
          machineInfo:{
            machineNum:this.data.machine.machineNum,
            machineid:this.data.machine.machineid
          }
        }
        this.selectComponent("#machine").requestLineChartData(temp)
      }break;
    }
    var that = this
    wx.request({
      url: tempUrl,
      data : tempData,
      header: {
        'content-type': 'application/json' 
      },
      method:"POST",
      success (res) {
         //此处屏蔽了系统错误
        if(!res.data.hasOwnProperty("code")){
          wx.showToast({  
            title: "网络错误",  
            icon: 'none',  
            duration: 2000,
          })
          return
        }
        if(res.data.code==1000){
          switch(e.detail.index){
            case 0:{
              switch(res.data.data.flag){
                case 0:res.data.data.tips_left="本日";break;
                case 1:res.data.data.tips_left="本周";break;
                case 2:res.data.data.tips_left="本月";break;
                case 3:res.data.data.tips_left="本年";break;
              }
              that.setData({
                information:res.data.data,
                currentSonInformationTab:res.data.data.flag
              });
              var temp={
                flag:res.data.data.flag,
                nowTime:res.data.data.nowTime,
                userid:app.data.userid
              }
              that.selectComponent("#information").requestLineChartData(temp)
            };break;
            case 1:{
              that.setData({machine:res.data.data[0]})
              res.data.data.shift()
              that.setData({otherMachineList:res.data.data})
            }break;
            case 3:{
              switch(res.data.data.flag){
                case 0:res.data.data.tips="本日";break;
                case 1:res.data.data.tips="本周";break;
                case 2:res.data.data.tips="本月";break;
                case 3:res.data.data.tips="本年";break;
              }
              that.setData({
                machine:res.data.data,
                currentSonMachineTab:res.data.data.flag
              })
            }break;
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
          title: '未连接网络',  
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
    if(this.data.machine==null) return
    this.setData({
      choose_index:e.detail.index
    })
    var myDetail = {
      detail:{
        index:3,
        flag:0
      }
    }
    this.tabChange(myDetail)
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
      var myDetail = {
        detail:{
          index:3,
          flag:Number(e.detail.index)
        }
      }
      this.tabChange(myDetail)
    }
  },

  swichSonInformationNav:function(e){
    if (this.data.currentSonInformationTab === e.detail.index) {
      return false;
    } else {
      var myDetail = {
        detail:{
          index:0,
          flag:Number(e.detail.index)
        }
      }
      this.tabChange(myDetail)
    }
  },

  onLoad(res){
    var e={
      detail:{
        flag:0,
        index:0
      }
    }
    this.setData({currentSonInformationTab:0})
    this.tabChange(e)
  }, 

  generateDate:function(){
    this.setData({
        date:app.generateSystemDate().split(" ")[0]
      })
    return app.generateSystemDate()
  }
  
})