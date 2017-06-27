/**
 * Created by EKO-LKB on 2017/3/29.
 */
define(function () {
    var tpl = [
        '<div class="popup video_container">',
           '<a class="icon pull-left iconfont icon-jiantou-copy-copy pull_down"></a>',
           '<div class="content-block video_box">',
             '<div class="video_title"><!--{{subVideoTitle}}--></div>',
             '<div class="video">',
                '<video id="train_video" class="video-js vjs-default-skin vjs-fluid vjs-big-play-centered" controls preload="none">',
                    /*'<source src="{{videoPath}}"/>',*/
                '</video>',
             '</div>',
             '<div class="lesson_text">',
               /* '{{videoContent}}',*/
             '</div>',
           '</div>',
        '</div>'
    ].join('');
    return tpl;
});