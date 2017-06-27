/**
 * Created by EKO-LKB on 2017/3/29.
 */
define(function () {
    var tpl = [
        '<div class="page" id="article_list">',
            '<header class="bar bar-nav">',
                '<a class="button button-link button-nav pull-left back"><span class="icon icon-left"></span></a>',
                '<h1 class="title">合集</h1>',
            '</header>',
            '<div class="content infinite-scroll articlelist_scroll" data-distance="0">',
                '<div class="cover_banner">',
                    '<div class="cover_header">',
                        '<div class="sub-content"><h2 class="page-title">技术分享</h2><p class="page-discription">健身先健脑</p></div>',
                    '</div>',
                '</div>',
                '<div class="list_layout">',
                   /* '<div class="article_box">',
                        '<div class="article_header"><img src="http://localhost:63342/SportApp/img/1490844293732_750x340.jpg" alt=""></div>',
                        '<div class="article_content"><h3>运动后膝痛别光静养,这份自救指南请私藏</h3><p>针对跑、跳及球类运动者的..</p></div>',
                    '</div>',*/
                '</div>',
                '<div class="infinite-scroll-preloader">',
                '   <div class="preloader"></div>',
                '</div>',
            '</div>',
        '</div>'
    ].join('');
    return tpl;
});