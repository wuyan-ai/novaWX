Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    tips_left1:"本日产量",
    tips_left2:"本日产率",
    tips_left3:"本日节省",
    tips1:"0吨",
    tips2:"0%",
    tips3:"0%",
    tips4:"0%",
    tips5:"￥0",
    tips6:"0%",
    pageData:["1512吨","20%","83.6%","95%","￥32,618","100%"]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 导航标签选择1）
   */
  swichNav: function (e) {
    var that = this;
    //TODO:此处发起网络请求，将返回的数据写入pageData列表。
   
    if (this.data.currentTab === e.target.dataset.current) {
      this.changeViewData(this,this.data.currentTab,this.data.pageData);
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
      this.changeViewData(this,this.data.currentTab,this.data.pageData);
    }
  },  
  changeViewData:function(that,currentTab,data) {
    switch(currentTab){
      case "0":that.setData({tips_left1:"本日产量",tips_left2:"本日产率",tips_left3:"本日节省"});break;
      case "1":that.setData({tips_left1:"本周产量",tips_left2:"本周产率",tips_left3:"本周节省"});break;
      case "2":that.setData({tips_left1:"本月产量",tips_left2:"本月产率",tips_left3:"本月节省"});break;
      case "3":that.setData({tips_left1:"本年产量",tips_left2:"本年产率",tips_left3:"本年节省"});break;
    }
    that.setData({
      tips1:data[0],
      tips2:data[1],
      tips3:data[2],
      tips4:data[3],
      tips5:data[4],
      tips6:data[5]
    })
  
  
  },
  /**
   * 导航页面显示2）
   */
  swiperChange: function (e) {
    console.log(e);
    this.setData({
      currentTab: e.detail.current,
    })
  }
})