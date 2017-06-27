/**
 * Created by EKO-LKB on 2017/2/13.
 */
define(['zepto', 'smmin','echo', 'video', 'template/trainMainTpl', 'template/trainListTpl', 'template/trainLessonTpl', 'template/videoTpl', 'mustache'], function ($, smmin, echo, video, trainMainTpl, trainListTpl, trainLessonTpl, videoTpl, mustache) {
    //alert("train_area");
    var getLessonTypeList = function() {
        post(BASE_URL + 'video/getVideoType/token/' + user.token, {} ,function (res) {
            //console.log(res);
            if(res.status == 401){
                $.alert("token失效,请重新登录", function () {
                    account.login();
                });
            }else if(res.status == 200){
                //console.log(res.data);
                var trainType = {
                    trainTypeList:[]
                };

                var totalLesson = 0;
                for(var index in res.data){
                    trainType.trainTypeList.push({
                        typeCover:res.data[index].typeCover,
                        videoType:res.data[index].videoType,
                        typeNum:res.data[index].typeNum
                        /*typeKeyword:res.data[index].typeKeyword*/
                    });
                    totalLesson += res.data[index].typeNum;
                }
                $('#main_page > .content').html(mustache.render(trainMainTpl, trainType));
                Echo.init({
                    offset:0,
                    throttle:300
                });
                $('#main_page > .content').on('scroll', function () {
                    Echo.init({
                        offset:0,
                        throttle:300
                    });
                });
                $('#main_page > .content').on('resize', function () {
                    Echo.init({
                        offset:0,
                        throttle:300
                    });
                });
                /*模糊查询*/
                $('#search').bind('search', function () {
                    //console.log(totalLesson);
                    var searchType = $('#search').val();
                    if(searchType == null){
                        searchType = '';
                    }
                    train.loadTrainList(searchType, totalLesson);
                });
                $('.lesson_tag > li').on('click', function () {
                    var trainType = $(this).attr("data-train_type");
                    var total = res.data[$(this).index()].typeNum;
                    //console.log(res.data[$(this).index()].typeNum);
                    //console.log(trainType);
                    train.loadTrainList(trainType, total);

                });
            }else {
                $.alert(res.error);
            }
        });
    };

    function getLessonList(videoListdata){
        if($('#train_list').length == 0){
            $('.page-group').append(trainListTpl);
        }

        $('.train_lession_list').empty();
        if($('.trainlist_scroll > .infinite-scroll-preloader').length == 0){
            $('.trainlist_scroll').append('<div class="infinite-scroll-preloader"><div class="preloader"></div></div>');
        }
        $.showIndicator();
        $('.modal-overlay').addClass('modal-overlay-visible');
        var loading = false;
        getListData(videoListdata);
        setTimeout(function () {
            $.hideIndicator();
            $('.modal-overlay').removeClass('modal-overlay-visible');
        }, 500);
        if(videoListdata.totalPage <= 1){
            $('.trainlist_scroll > .infinite-scroll-preloader').remove();
            return false;
        }
        $(document).off('infinite').on('infinite', '.trainlist_scroll',function() {
            //console.log(videoListdata.currentPage+'==' + videoListdata.totalPage + '--' + loading);
            if(loading) return;
            loading = true;
            setTimeout(function () {
                loading = false;
                if(videoListdata.currentPage >= videoListdata.totalPage){
                    $.detachInfiniteScroll($('.trainlist_scroll'));
                    $('.trainlist_scroll > .infinite-scroll-preloader').remove();
                    return false;
                }
                videoListdata.currentPage++;
                getListData(videoListdata);
                $.refreshScroller();
            }, 1000);
        });

    }

    function getListData(videoListdata) {
        post(BASE_URL+ 'video/getVideoList/token/'+ user.token, videoListdata, function (res) {
            if(res.status == 401){
                $.alert("token失效,请重新登录", function () {
                    account.login();
                });
            }else if(res.status == 200){
                //console.log(res);
                if(res.data.length < 5){
                    $('.trainlist_scroll > .infinite-scroll-preloader').remove();
                }
                if(res.data.length == 0 && $('.train_lession_list > li').length == 0){
                    $('.train_lession_list').html('<div class="searchNull">搜索结果为空</div>');
                    return false;
                }
                for(var index in res.data){
                    $('.train_lession_list').append('<li data-videoId="'+res.data[index].videoId+'"><div class="lesson_introduce"><img class="lazy" src="../img/blank.gif" data-echo="'+res.data[index].coverPath+'"></div><div class="introduce_title">' + res.data[index].videoTitle + '</div><div class="pioneer">'+res.data[index].videoTag+'</div></li>');
                }
                $('.train_lession_list > li').off('click').on('click', function () {
                    //console.log($(this).index());
                    var lessonId = $(this).attr("data-videoId");
                    train.loadTrainLesson(lessonId);
                });

                Echo.init({
                    offset:0,
                    throttle:300
                });
                $('.trainlist_scroll').on('scroll', function () {
                    Echo.init({
                        offset:0,
                        throttle:300
                    });
                });
                $('.trainlist_scroll').on('resize', function () {
                    Echo.init({
                        offset:0,
                        throttle:300
                    });
                });

            }else{
                $.alert(res.error);
            }
        });
    }
    
    function getLessonContent(lessonId, isCollected) {
        //console.log(isCollected);
        post(BASE_URL + 'video/'+lessonId + '/detail/token/' + user.token, {}, function (res) {
            if(res.status == 401){
                $.alert("token失效,请重新登录", function () {
                    account.login();
                });
            }else if(res.status == 200){
                //console.log(res.data);
                //console.log(isCollected);
                var lessonHtml = '';
                var lessonLength = res.data.length - 1;
                if($('#train_lesson').length == 0){
                    $('.page-group').append(trainLessonTpl);
                }
                $('.lesson_title').html(res.data[0].videoTitle);
                //$('.lesson_banner > img').data('echo', res.data[0].coverImg);
                //console.log($('.lesson_banner > img').data('echo'));
                $('.lesson_banner > img').attr('data-echo', res.data[0].coverImg);
                if(isCollected == 10){
                    $('.lesson_banner > .add-button').addClass('disabled').text("已收藏").attr('disabled', 'disabled');
                }
                if(isCollected == 11){
                    $('.lesson_banner > .add-button').removeClass('disabled').text("加入训练").removeAttr('disabled');
                }
                for(var index in res.data){
                    lessonHtml += '<li class="item-content"><div class="item-title">'+res.data[index].subVideoTitle +'</div></li>'
                }
                $('#train_lesson > .content > .list-block > .list-container').html(lessonHtml);
                $.router.load('#train_lesson');
                $.showIndicator();
                $('.modal-overlay').addClass('modal-overlay-visible');
                Echo.init({
                    offset:0,
                    throttle:300
                });
                setTimeout(function () {
                    $.hideIndicator();
                    $('.modal-overlay').removeClass('modal-overlay-visible');
                }, 500);
                $('#train_lesson > .content > .list-block li').on('click', function () {
                    var videoIndex = $(this).index();
                    var lastFlag = false;
                    if(lessonLength == videoIndex){
                        lastFlag = true;
                    }
                    train.playTrainVideo(res.data[videoIndex], lastFlag);
                    //$.popup('.video_container');
                });
                var loading = false;
                $('.lesson_banner > .add-button').off('click').on('click', function (e) {
                    if(loading) return;
                    loading = true;
                    e.stopPropagation();
                    //console.log($(this));
                    train.addCollection(lessonId);
                    loading = false;
                });
            }else {
                $.alert(res.error);
            }
        });
    }

    
    var train;
    train = {
        loadTrain: function () {
            getLessonTypeList();
            $.init();
        },

        //args:type
        loadTrainList: function (trainType, total) {
            /*train.pageSize = 5;
            this.page = 1;*/
            var videoListdata = {
                searchType: trainType,
                pageSize: 5,
                currentPage: 1,
                totalPage:Math.ceil(total/5)
            };
            getLessonList(videoListdata);
            $.router.load('#train_list');
            //$.init();
        },

        //args:id
        loadTrainLesson: function (lessonId) {
            /*post(BASE_URL + 'videoCollection/'+ lessonId + '/isCollection/token/' + user.token, {}, function (res) {
               console.log(res);
            });*/
            train.checkCollection(lessonId);
            //getLessonContent(lessonId);
            $.init();
        },
        checkCollection:function (lessonId) {
            post(BASE_URL + 'videoCollection/'+ lessonId + '/isCollection/token/' + user.token, {}, function (res) {
                //console.log(res);
                if(res.status == 401){
                    $.alert("token失效,请重新登录", function () {
                        account.login();
                    });
                }else if(res.status == 10 || res.status == 11){
                    getLessonContent(lessonId, res.status);
                }else {
                    $.alert(res.error);
                }
            });
        },
        addCollection:function (lessonId) {
            post(BASE_URL + 'videoCollection/' + lessonId + '/addCollection/token/' + user.token, {}, function (res) {
                //console.log(res);
                if(res.status == 401){
                    $.alert("token失效,请重新登录", function () {
                        account.login();
                    });
                }else if(res.status == 8){
                    $('.lesson_banner > .add-button').addClass('disabled').text("已收藏").attr('disabled', 'disabled');
                }else{
                    $.alert(res.error);
                }
            });
        },
        playTrainVideo: function (videoData, lastFlag) {
            /*$('.video_container').html(videoTpl);
            $('.video_container').on('click', function () {
                $.closeModal('.video_container');
            });*/
            //console.log(videoData);
           /* var videoView = {
                subVideoTitle:videoData.subVideoTitle,
                videoPath:videoData.videoPath,
                videoContent:videoData.videoContent
            };
            $('.video_container').html(mustache.render(videoTpl, videoView));*/
            $.popup(videoTpl);
            $('.video_title').html(videoData.subVideoTitle);
            $('#train_video').html('<source src="'+videoData.videoPath+'"/>');
            $('.lesson_text').html(videoData.videoContent);

            var player = video('train_video');
            player.off('timeupdate').on('timeupdate', function () {
                if(player.duration() != 0 && player.currentTime() === player.duration() && lastFlag){
                    trainFlag = true;
                    //$.alert("恭喜完成训练，快去签到吧");
                    //console.log(trainFlag);
                }
            });

            $('.pull_down').on('click', function () {
                $.closeModal('.video_container');
                player.dispose();
            });
        }

    };

    return train;

});