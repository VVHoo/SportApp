/**
 * Created by EKO-LKB on 2017/3/23.
 */
(function ($) {
   var post = function (url, data, callback) {
       $.ajax({
           url:url,
           type:'POST',
           data:JSON.stringify(data),
           xhrFields:{withCredentials:true},
           dataType:'json',
           contentType: 'application/json',
           success:function (res) {
               if(res.status == -2){
                   $.alert('已在别的地方登录', function () {
                       account.login();
                       return false;
                   });
               }else {
                   callback(res);
               }
           },
           error:function () {
               networkOnline();
               //$.toast("请检查当前网络状态");
           }
       });
   };

    //判断当前网络状态
    var networkOnline = function () {
        if(navigator.onLine){

        }else {
            $.toast('断网啦!!请检查当前网络状态');
        }
    };
    // 判断是否支持canvas标签
    var isCanvasSupported = function() {
        var canvas = document.createElement('canvas');
        var supported = !!(canvas.getContext && canvas.getContext('2d'));
        canvas = undefined;
        return supported;
    };
   window.BASE_URL = 'http://192.168.199.119:8080/';
   window.post = post;
   window.isCanvasSupported = isCanvasSupported;
   window.networkOnline = networkOnline;
})(Zepto);