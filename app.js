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
        case 1:return ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        case 2:{
          var days = new Date(data.year,data.month,0).getDate();
          var temp = []
          for(var i=1;i<=days;i++){
            temp.push(i)
          }
          return temp
        }
        case 3:return ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
      }
    }
})