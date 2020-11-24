
var point = [];
var that2;
var countTooGetLocation = 0;
var total_micro_second = 0;
var starRun = 0;
var totalSecond  = 0;
var oriMeters = 0.0;
var showMeters = 0.0;
function count_down(that) {

  if (starRun == 0) {
    return;
  }

  if (countTooGetLocation >= 100) {
    var time = date_format(total_micro_second);
    that.updateTime(time);
    
  }

  if (countTooGetLocation >= 1000) { //1000为1s
      getlocation(that);
      
      that.meters=showMeters;
      drawline();
      countTooGetLocation = 0;
  }   
  

setTimeout
  setTimeout(function(){
  countTooGetLocation += 10;
  total_micro_second += 10;
  count_down(that);
  }
  ,10
  )
}


// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
  // 秒数
  var second = Math.floor(micro_second / 1000);
  // 小时位
  var hr = Math.floor(second / 3600);
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  // 秒位
var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;


return hr + ":" + min + ":" + sec + " ";
}


function getDistance(lat1, lng1, lat2, lng2) { 
  var dis = 0;
  var radLat1 = toRadians(lat1);
  var radLat2 = toRadians(lat2);
  var deltaLat = radLat1 - radLat2;
  var deltaLng = toRadians(lng1) - toRadians(lng2);
  var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
  return dis * 6378137;

  function toRadians(d) {  return d * Math.PI / 180;}
} 

function fill_zero_prefix(num) {
return num < 10 ? "0" + num : num
}

function drawline() {
    that2.setData({
       polyline : [{
          points : point,
           color : '#99FF00',
           width : 4,
           dottedLine : false
       }]
    });
}
 
//获取经纬度
function getlocation(that) {
    var lat, lng;
    wx.startLocationUpdateBackground({
      success: (res) => {console.log("test back");},
    })
    wx.startLocationUpdate({
      success: (res) => {
        console.log("test front");
            lat = res.latitude;
            lng = res.longitude;
            var len= point.length;
            

            if (len == 0) {
              point.push({latitude: lat, longitude : lng});
              len=1;
            }
            var lastCover =point[len-1];
            var newMeters = getDistance(lastCover.latitude,lastCover.longitude,res.latitude,res.longitude)/1000;
            that.mapCtx.translateMarker({
              markerId: 1,
              autoRotate: true,
              duration: 1000,
              destination: {
                latitude:lat,
                longitude:lng,
              },
              animationEnd() {
                console.log('animation end')
              }
            });
            if (newMeters < 0.0015){
              newMeters = 0.0;
            }
            oriMeters = oriMeters + newMeters; 
            console.log("newMeters----------")
            console.log(newMeters);
            point.push({latitude: lat, longitude : lng});
            console.log(point);
            var meters = new Number(oriMeters);
            showMeters = meters.toFixed(2);
      },
    });

}
 
Page({
   data : {
       polyline : [],
       longitude: 104.09420013427734,
       latitude: 30.67694091796875,
       meters : 0.0,
       time: "0:00:00",
       markers: [{
        id: 1,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 20,   // 使用图标的宽度
        height: 20, // 使用图标的高度
        name: 'loc'
      }]
   },
 
    onLoad : function () {
        this.mapCtx = wx.createMapContext('myMap');
        that2 = this;
        wx.getLocation({
          type : 'wgs84',
           success : function (res) {
            that2.setData({
              longitude : res.longitude,
              latitude : res.latitude,
            });
            
            console.log(res.latitude,res.longitude);
           }
       });
        this.mapCtx.moveToLocation();
        count_down(this);
    },
    locate : function(){
      this.mapCtx.moveToLocation();
    },
    start : function () {
        
      if (starRun == 1) {
        return;
      }
      starRun =1;
      count_down(this);
      

    },
    end : function () {
        console.log('end');
        starRun = 0;
        count_down(this);

    },
    //****************************
  updateTime:function (time) {

    var data = this.data;
    data.time = time;
    this.data = data;
    this.setData ({
      time : time,
    })

  },
});