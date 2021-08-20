var app = getApp()
Component({
  properties:{
    machine:null,
    otherMachineList:null
  },
  data: {
    
  },
  methods: {
    navigatoionBack:function(){
      var myDetail={index:3}
      this.triggerEvent("changeChooseIndex",myDetail)
    },
    swap:function(e){
      var myDetail={id:e.currentTarget.id}
      this.triggerEvent("swap",myDetail)
    },
  },

})
