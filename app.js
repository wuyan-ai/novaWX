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
      return this.data.globalDate.getFullYear() + "-" + (this.data.globalDate.getMonth() + 1) + "-" + (this.data.globalDate.getDate()) +" "+(n-1)+ ":00:00"
    },
  
    getCurrentWeek: function(n){
      if(n%3==1)
        return this.data.globalDate.getFullYear() + "-" + (this.data.globalDate.getMonth() + 1) + "-" + (this.data.globalDate.getDate()-8+n) + " 00:00:00"
      if(n%3==2)
        return this.data.globalDate.getFullYear() + "-" + (this.data.globalDate.getMonth() + 1) + "-" + (this.data.globalDate.getDate()-8+n) + " 08:00:00"
      if(n%3==0)
        return this.data.globalDate.getFullYear() + "-" + (this.data.globalDate.getMonth() + 1) + "-" + (this.data.globalDate.getDate()-8+n) + " 16:00:00"
    },

    getCurrentMonth: function(n){
        return this.data.globalDate.getFullYear() + "-" + (this.data.globalDate.getMonth() + 1) + "-" + n + " 00:00:00"
    },

    getCurrentYear: function(n){
      if(n%2==1)
        return this.data.globalDate.getFullYear() + "-" + n + "-" + 1 + " 00:00:00"
      else
        return this.data.globalDate.getFullYear() + "-" + n + "-" + 15 + " 00:00:00"

    },

    getLineXaisLabel(data){
      switch(data.flag){
        case 0:return ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'];
        case 1:return ['周一','','','周二', '','', '周三', '','','周四','','','周五','','', '周六','','','周日', '','',''];
        case 2:{
          var days = new Date(data.year,data.month,0).getDate();
          var temp = []
          for(var i=1;i<=days;i++){
            temp.push(i)
          }
          temp.push(days+1)
          return temp
        }
        case 3:return ['1','','2','','3','','4','','5','','6','','7','','8','','9','','10','','11','','12','',''];
      }
    }
})