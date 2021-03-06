Page({
  data: {
    phone: '',
    password:''
  },
  useridInput :function (e) {
    this.setData({
      phone:e.detail.value
    })
  },
  passwdInput :function (e) {
    this.setData({
      password:e.detail.value
    })
  },
  login: function () {
    if(this.data.phone.length == 0 || this.data.password.length == 0){
      wx.showToast({  
        title: '账号或密码为空',  
        icon: 'loading',  
        duration: 2000  
      })  
  }else {
    var that = this;
    var app=getApp()
      wx.request({
        url: app.data.networkAddress+'user/login', 
        data: {
            username:that.data.phone,
            password:that.data.password
        },
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
            wx.showToast({  
              title: '登录成功',  
              icon: 'success',  
              duration: 2000 ,
            })  ,
            wx.navigateTo({
              url: '/pages/mainpage/mainpage',
            })
            app.data.userid=res.data.userid
            app.data.globalDate=new Date()
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
    }  
  },
})