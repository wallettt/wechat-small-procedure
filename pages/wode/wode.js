var app = getApp();

Page({
  	data: {
  		userInfo: {},
      mode: ''
    },
    
    
    recordTap: function() {
      wx.navigateTo({
        url: '../record/record'
      })
    },

    helpTap: function() {
      wx.navigateTo({
        url: '../help/help'
      })
    },

    riskTap: function() {
      wx.navigateTo({
        url: '../risk/risk'
      })
    },

    settingTap: function() {
      wx.navigateTo({
        url: '../setting/setting'
      })
    },

  	onLoad: function() {
  		var that = this;
  		wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                userInfo: res.userInfo
              })
            }
          })
        }
      });
  	}
})