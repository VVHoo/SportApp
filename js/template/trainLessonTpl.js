/**
 * Created by EKO-LKB on 2017/3/29.
 */
define(function () {
    var tpl = [
        '<div class="page" id="train_lesson">',
            '<header class="bar bar-nav">',
                '<a class="button button-link button-nav pull-left back"><span class="icon icon-left"></span></a>',
                '<h1 class="title">课程训练</h1>',
            '</header>',
            '<div class="content">',
                '<div class="lesson_banner">',
                    '<img class="lazy" src="../img/blank.gif" data-echo="">',
                    '<div class="lesson_title"></div>',
                    '<div class="pioneer">2人训练</div>',
                    '<button class="button add-button">加入训练</button>',
                '</div>',
                '<div class="list-block">',
                    '<ul class="list-container">',
                       /* '<li class="item-content"><div class="item-title">第一节 股后肌群动态拉伸</div></li>',
                        '<li class="item-content"><div class="item-title">第一节 股后肌群动态拉伸</div></li>',
                        '<li class="item-content"><div class="item-title">第一节 股后肌群动态拉伸</div></li>',
                        '<li class="item-content"><div class="item-title">第一节 股后肌群动态拉伸</div></li>',
                        '<li class="item-content"><div class="item-title">第一节 股后肌群动态拉伸</div></li>',
                        '<li class="item-content"><div class="item-title">第一节 股后肌群动态拉伸</div></li>',*/
                    '</ul>',
                '</div>',
            '</div>',

            /*'<div class="popup video_container">',
                '<div class="content-block">',
                    'test popup',
                    '<p><a href="#" class="close-popup">close</a></p>',
                '</div>',
            '</div>',*/
        '</div>'
    ].join('');
    return tpl;
});