// components/machine_detail/machine_detail.js
Component({
  data: {
    firstMachine:{
      imgSrc:"/images/machine_online.png",
      machine_name:"设备1",
      machineID:"12345",
      machineStatus:"已联网",
      machineUpdateTime:"2021-09-01"
    },
    otherMachineList:[{
      imgSrc:"/images/machine_offline.png",
      machine_name:"设备2",
      machineID:"12346",
      machineStatus:"未联网",
      machineUpdateTime:"2021-09-01"
    },{
      imgSrc:"/images/machine_online.png",
      machine_name:"设备3",
      machineID:"12347",
      machineStatus:"已联网",
      machineUpdateTime:"2021-09-01"
    },{
      imgSrc:"/images/machine_offline.png",
      machine_name:"设备4",
      machineID:"12348",
      machineStatus:"未联网",
      machineUpdateTime:"2021-09-01"
    },{
      imgSrc:"/images/machine_online.png",
      machine_name:"设备5",
      machineID:"12349",
      machineStatus:"已联网",
      machineUpdateTime:"2021-09-01"
    }
    ],
  },
  methods: {
    navigatoionBack:function(){
      var myDetail={index:1,machineInfo:this.data.firstMachine}
      this.triggerEvent("changeChooseIndex",myDetail)
    },
    swap:function(e){
      var index;
      for(index=0;index<this.data.otherMachineList.length;index++){
        if(this.data.otherMachineList[index].machineID==e.target.id)
          break;
      }
      var temp=this.data.firstMachine
      this.data.firstMachine=this.data.otherMachineList[index]
      this.data.otherMachineList[index]=temp
      this.setData({
        firstMachine:this.data.firstMachine,
        otherMachineList:this.data.otherMachineList,
      })
    },
  }
})
