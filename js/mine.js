/**
 * Created by EKO-LKB on 2017/2/13.
 */
define(['zepto', 'smmin', 'smextend', 'template/mineTpl', 'train', 'mustache', 'echo'], function ($, smmin, smextend, mineTpl ,train, mustache , echo) {
   //alert("train_area");
    function getMineData() {
        post(BASE_URL + 'videoCollection/getCollectionList/token/'+ user.token, {} , function (res) {
            //console.log(res);
            //console.log(localStorage.getItem("user"));
            if(res.status == 401){
                $.alert("token失效,请重新登录", function () {
                    account.login();
                });
            }else if(res.status == 200){
                //console.log(res.data);
                var myTrain = {
                    myTrainNum:res.data.length,
                    myList:[]
                };
                for(var index in res.data){
                    myTrain.myList.push({
                        trainPath:res.data[index].coverPath,
                        trainId:res.data[index].videoId,
                        trainTitle:res.data[index].videoTitle
                    })
                }
                $('#main_page > .content').html(mustache.render(mineTpl, myTrain));
                if(myTrain.myTrainNum === 0){
                    $('.mytrain_lesson').html('<div class="lessonNull">还没有训练课程，快去添加吧~</div>');
                }
                Echo.init({
                    offset:0,
                    throttle:300
                });
                $('#main_page').on('scroll', function () {
                    Echo.init({
                        offset:0,
                        throttle:300
                    });
                });
                $('#main_page').on('resize', function () {
                    Echo.init({
                        offset:0,
                        throttle:300
                    });
                });

                //模拟长按事件
                var touchStartTime = 0, touchEndTime = 0, lessonTimer = null, triggerClick = true;
                var videoId;
                $('.mytrain_lesson > .card').on('touchstart', function (event) {
                    triggerClick = true;
                    touchStartTime = new Date().getTime();
                    videoId = $(this).data('id_video');
                    console.log(videoId);
                    lessonTimer = setTimeout(function () {
                        var buttons = [
                            {
                                text:'退出训练',
                                onClick:function () {
                                    mine.cancelCollection(videoId);
                                }
                            }
                        ];
                        var exitButtons = [
                            {
                                text:'取消'
                            }
                        ];
                        var groups = [buttons, exitButtons];
                        $.actions(groups);
                    }, 300);
                });
                $('.mytrain_lesson > .card').on('touchmove', function () {
                    clearTimeout(lessonTimer);
                    lessonTimer = null;
                    triggerClick = false;
                });
                $('.mytrain_lesson > .card').on('touchend', function () {
                    touchEndTime = new Date().getTime();
                    clearTimeout(lessonTimer);
                    lessonTimer = null;
                    if(touchEndTime - touchStartTime < 300 && triggerClick){
                        var videoId = $(this).data('id_video');
                        train.loadTrainLesson(videoId);
                    }
                });
                getSignInfo();
            }else {
                $.alert(res.error);
            }
        });
    }
    function getSignInfo() {
        post(BASE_URL + 'Auth/getSign/token/' + user.token, {}, function (res) {
            console.log(res.data);
            if(res.status == 401){
                $.alert("token失效,请重新登录", function () {
                    account.login();
                });
            }else if(res.status == 200){
                $('.sign_num').text(res.data.signNum);
                //console.log(trainFlag);
                if(res.data.admitSign){
                    $('.sign').removeClass('disabled').text("签到").removeAttr('disabled');
                    $('.sign').on('click', function () {
                        if(trainFlag){
                            mine.sign();
                            trainFlag = false;
                        }else{
                            $.alert("今天还没完成训练哦~");
                        }
                    });
                }else {
                    $('.sign').addClass('disabled').text("已签到").attr('disabled', 'disabled');
                }
            }else{
                $.alert(res.error);
            }
        });
    }
    var mine = {
        loadMine:function () {
            getMineData();
            $.init();
        },
        cancelCollection:function (videoId) {
            post(BASE_URL + 'videoCollection/' + videoId + '/cancelCollect/token/' + user.token, {}, function (res) {
                if(res.status == 401){
                    $.alert("token失效,请重新登录", function () {
                        account.login();
                    });
                }else if(res.status == 12){
                    //$.alert("已退出该训练课程");
                    mine.loadMine();
                }else {
                    $.alert(res.error);
                }
            })
        },
        sign:function () {
            post(BASE_URL + 'Auth/sign/token/' + user.token, {}, function (res) {
                console.log(res);
                if(res.status == 401) {
                    $.alert("token失效,请重新登录", function () {
                        account.login();
                    });
                }else if(res.status == 16){
                    //$('.sign').addClass('disabled').text("已签到").attr('disabled', 'disabled');
                    mine.loadMine();
                }else {
                    $.alert(res.error);
                }
            });
        }
    };

    return mine;
    
});