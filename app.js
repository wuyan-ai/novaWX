//app.js
App({
  data:{
    userid:null,
    networkAddress:"http://wy.free.svipss.top/",
    globalDate:null
  },

    generateSystemDate:function(){
      var year = this.data.globalDate.getFullYear()
      var month = this.data.globalDate.getMonth()+1
      var day = this.data.globalDate.getDate()
      var hour = this.data.globalDate.getHours()
      var minute = this.data.globalDate.getMinutes()
      var second = this.data.globalDate.getSeconds()
      return [year,month,day].map(this.formatNumber).join('-')+" "+[hour,minute,second].map(this.formatNumber).join(':')
    },

    formatNumber:function(n){
      n=n.toString()
      return n[1]?n:'0'+n
    },

    getCurrenDay: function(n){
      return this.data.globalDate.getFullYear() + "-" + (this.data.globalDate.getMonth() + 1) + "-" + (this.data.globalDate.getDate()) +" "+n+ ":00:00"
    },
  
    getCurrentWeek: function(n){
      return this.data.globalDate.getFullYear() + "-" + (this.data.globalDate.getMonth() + 1) + "-" + (this.data.globalDate.getDate()-8+n) + " 00:00:00"
    },

    getCurrentMonth: function(n){
        return this.data.globalDate.getFullYear() + "-" + (this.data.globalDate.getMonth() + 1) + "-" + n + " 00:00:00"
    },

    getCurrentYear: function(n){
      return this.data.globalDate.getFullYear() + "-" + n + "-" + 1 + " 00:00:00"
    },

    getLineXaisLabel(data){
      switch(data.flag){
        case 0:return ['0:00','1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'];
        case 1:return ['周一0:00','周一8:00','周一16:00','周二0:00', '周二8:00','周二16:00', '周三0:00', '周三8:00','周三16:00','周四0:00','周四8:00','周四16:00','周五0:00','周五8:00','周五16:00', '周六0:00','周六8:00','周六16:00','周日0:00', '周日8:00','周日16:00'];
        case 2:{
          var days = new Date(data.year,data.month,0).getDate();
          var temp = []
          for(var i=1;i<=days;i++){
            temp.push(i)
          }
          return temp
        }
        case 3:return ['1月1号','1月15号','2月1号','2月15号','3月1号','3月2号','4月1号','4月15号','5月1号','5月15号','6月1号','6月15号','7月1号','7月15号','8月1号','8月15号','9月1号','9月15号','10月1号','10月15号','11月1号','11月15号','12月1号','12月15号'];
      }
    }
})