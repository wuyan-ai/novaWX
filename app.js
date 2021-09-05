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

    getCurrenDay: function(n){    //00:00:00  1:00:00    ....  23:00:00  23:59:59
      return this.data.globalDate.getFullYear() + "-" + (this.data.globalDate.getMonth() + 1) + "-" + (this.data.globalDate.getDate()) +" "+(n-1)+ ":00:00"
    },
  
    getCurrentWeek: function(n){  //周一 00:00:00  周一 8:00:00    ....  周日23:00:00   ....  周日 23:59:59
      var day =  this.data.globalDate.getDay() || 7;
      if(n%3==1)
        return this.dateFormat("YYYY-mm-dd HH:MM:SS",new Date(this.data.globalDate.getFullYear(), this.data.globalDate.getMonth(), this.data.globalDate.getDate() +  Math.ceil(n/3) - day,"00"))
      if(n%3==2)
        return this.dateFormat("YYYY-mm-dd HH:MM:SS",new Date(this.data.globalDate.getFullYear(), this.data.globalDate.getMonth(), this.data.globalDate.getDate() +  Math.ceil(n/3) - day,"08"))      
      if(n%3==0)
        return this.dateFormat("YYYY-mm-dd HH:MM:SS",new Date(this.data.globalDate.getFullYear(), this.data.globalDate.getMonth(), this.data.globalDate.getDate() + Math.ceil(n/3) - day,"16"))    
    },

    getCurrentMonth: function(n){   //8-1 00:00:00           ....  8-31 00:00:00  8-31 23:59:59
        return this.data.globalDate.getFullYear() + "-" + (this.data.globalDate.getMonth() + 1) + "-" + n + " 00:00:00"
    },

    getCurrentYear: function(n){   //1-1 00:00:00           ....  12-15 00:00:00  12-31 23:59:59
      if(n%2==1)
        return this.data.globalDate.getFullYear() + "-" + ((n+1)/2) + "-" + 1 + " 00:00:00"
      else
        return this.data.globalDate.getFullYear() + "-" + (n/2) + "-" + 15 + " 00:00:00"

    },

    getLineXaisLabel(data){
      switch(data.flag){
        case 0:return ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','时'];
        case 1:return ['周一','','','周二', '','', '周三', '','','周四','','','周五','','', '周六','','','周日', '','',''];
        case 2:{
          var days = new Date(data.year,data.month,0).getDate();
          var temp = []
          for(var i=1;i<=days;i++){
            temp.push(i)
          }
          temp.push("日")
          return temp
        }
        case 3:return ['1','','2','','3','','4','','5','','6','','7','','8','','9','','10','','11','','12','','月'];
      }
    },
    dateFormat:function(fmt, date) {
      let ret;
      const opt = {
          "Y+": date.getFullYear().toString(),        // 年
          "m+": (date.getMonth() + 1).toString(),     // 月
          "d+": date.getDate().toString(),            // 日
          "H+": date.getHours().toString(),           // 时
          "M+": date.getMinutes().toString(),         // 分
          "S+": date.getSeconds().toString()          // 秒
          // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
          ret = new RegExp("(" + k + ")").exec(fmt);
          if (ret) {
              fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
          };
      };
      return fmt;
  },
})