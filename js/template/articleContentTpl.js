/**
 * Created by EKO-LKB on 2017/3/29.
 */
define(function () {
    var tpl = [
        '<div class="page" id="article_content">',
            '<header class="bar bar-nav">',
                '<a class="button button-link button-nav pull-left back"><span class="icon icon-left"></span></a>',
                '<h1 class="title">文章详情</h1>',
            '</header>',
            '<nav class="bar bar-tab comment_window">',
                '<div class="comment_input"><label class="icon icon-edit"></label><input type="text" name="comment_input" placeholder="说点什么吧"/></div>',
                '<a class="button button-dark send_comment">发送</a>',
            '</nav>',
            '<div class="content infinite-scroll comment_scroll">',
                '<div class="card article_text">',
                    '<div class="card-content"></div>',
                    /*'<div class="card-footer">',
                        '<div class="like"><span>10</span><i class="icon iconfont pull-left icon-dianzandian-copy">	</i></div>',
                    '</div>',*/
                '</div>',
                '<div class="card article_comment">',
                    '<div class="card-header"></div>',
                    '<div class="card-content">',
        
                    '</div>',
                '</div>',
                '<div class="infinite-scroll-preloader">',
                '   <div class="preloader"></div>',
                '</div>',
            '</div>',
        '</div>'
    ].join('');
    return tpl;
});