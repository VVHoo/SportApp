/**
 * Created by EKO-LKB on 2017/3/28.
 */
define(function () {
    var tpl = [
        '<div class="content-padded sign_container">',
            '<div class="row">',
                '<div class="col-33">',
                    '<span class="mine_num sign_num"></span>',
                    '<span class="mine_text">签到天数</span>',
                '</div>',
                '<div class="col-33">',
                    '<span class="mine_num">{{myTrainNum}}</span>',
                    '<span class="mine_text">我的课程</span>',
                '</div>',
                '<div class="col-33 sign_box">',
                    '<div class="sign"></div>',
                '</div>',
            '</div>',
        '</div>',
        '<div class="list-block mytrain_lesson">',
            '{{#myList}}',
            '<div class="card" data-id_video="{{trainId}}">',
                '<div class="card-content">',
                    '<img src="../img/blank.gif" data-echo="{{trainPath}}">',
                '</div>',
                '<div class="card-footer">{{trainTitle}}</div>',
            '</div>',
            '{{/myList}}',
        '</div>'
    ].join('');
    return tpl;
});
