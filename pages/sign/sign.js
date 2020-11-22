// pages/sign/sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

  },

  site: function () {
    var that = this;
     var lat1=1.0;
     var lng1=2.0;
    var lat2 = 30.67694091796875;
    var lng2 = 104.09420013427734;

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        //console.log(res)
        lat1 = res.latitude;
        lng1  = res.longitude;
     

   
     
        // name	位置名称
        // address	详细地址
        // latitude	纬度，浮点数，范围为 - 90~90，负数表示南纬
        // longitude	经度，浮点数，范围为 - 180~180，负数表示西经
        
        
        //var lat2 = 102.0;
        //var lng2 = 32.0;
        console.log(lat1, lng1, lat2, lng2);
    /*var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lng1 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));*/
    var s=Math.asin(Math.sqrt(Math.pow(Math.sin((lat1-lat2)/2.0),2) +Math.cos(lat1)*Math.cos(lat2)*Math.pow(Math.sin((lng1-lng2)/2.0),2) ));
    
    s = s * 6378.137*2.0;
    console.log(Number(s));
    //s = Math.round(s * 10000) / 10000;
        if (Number(s)>10){
          wx.showModal({
            title: '温馨提示',
            content: '你不在范围内',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          });
        }else{
          wx.showModal({
            title: '温馨提示',
            content: '签到成功',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        console.log('两点之间距离多少km：',s);
      
      }
    })
  },

  /*function juli(lat1, lng1, lat2, lng2) {
    console.log(lat1, lng1, lat2, lng2)
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s
  },*/

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

  }
})