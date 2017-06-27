/**
 * Created by EKO-LKB on 2017/3/28.
 */
define(function () {
    var tpl = [
        '<div class="page" id="train_list">',
            '<header class="bar bar-nav">',
                '<a class="button button-link button-nav pull-left back"><span class="icon icon-left"></span></a>',
                '<h1 class="title">合集</h1>',
            '</header>',
            '<div class="content infinite-scroll trainlist_scroll" data-distance="0">',
                '<ul class="train_lession_list clearfix">',
                    /*'{{#lessonList}}',
                    '<li>',
                        '<div class="lesson_introduce">',
                            '<img class="lazy" src="../img/blank.gif" data-echo="{{videoCover}}">',
                        '</div>',
                        '<div class="introduce_title">{{videoTitle}}</div>',
                        '<div class="pioneer">2人训练</div>',
                    '</li>',
                    '{{/lessonList}}',*/
                '</ul>',
                '<div class="infinite-scroll-preloader">',
                '   <div class="preloader"></div>',
                '</div>',
            '</div>',
        '</div>'
    ].join('');
    return tpl;
});
