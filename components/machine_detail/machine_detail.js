// components/machine_detail/machine_detail.js
Component({
  data: {
    firstMachine:{
      imgSrc:"/images/machine_online.png",
      machine_name:"设备1",
      machineID:"13235",
      machineStatus:"已联网",
      machineUpdateTime:"2021-09-01"
    },
    otherMachineList:[{
      imgSrc:"/images/machine_offline.png",
      machine_name:"设备2",
      machineID:"13235",
      machineStatus:"未联网",
      machineUpdateTime:"2021-09-01"
    },{
      imgSrc:"/images/machine_online.png",
      machine_name:"设备3",
      machineID:"13235",
      machineStatus:"已联网",
      machineUpdateTime:"2021-09-01"
    },{
      imgSrc:"/images/machine_offline.png",
      machine_name:"设备2",
      machineID:"13235",
      machineStatus:"未联网",
      machineUpdateTime:"2021-09-01"
    },{
      imgSrc:"/images/machine_online.png",
      machine_name:"设备3",
      machineID:"13235",
      machineStatus:"已联网",
      machineUpdateTime:"2021-09-01"
    }
    ],
  },
  methods: {
    navigatoionBack:function(){
      var myDetail={index:1}
      this.triggerEvent("changeChooseIndex",myDetail)
    }
  }
})
