/**
 * Created by EKO-LKB on 2017/3/28.
 */
define(function () {
    var tpl = [
        '<div class="page-group">',
            '<div class="page page-current" id="main_page">',
                '<header class="bar bar-nav common_head">',
                    '<a class="icon icon-me pull-left open-panel myinformation"></a>',
                    '<h1 class="title top-title"></h1>',
                '</header>',
                '<nav class="bar bar-tab main-button">',
                    '<a class="tab-item external" href="#" id="train">',
                        '<span class="icon iconfont icon-jianshen2"></span>',
                        '<span class="tab-label">训练</span>',
                    '</a>',
                    '<a class="tab-item external" href="#" id="article">',
                        '<span class="icon iconfont icon-gonglve"></span>',
                        '<span class="tab-label">发现</span>',
                    '</a>',
                    '<a class="tab-item external" href="#" id="mine">',
                        '<span class="icon iconfont icon-wode"></span>',
                        '<span class="tab-label">我的</span>',
                    '</a>',
                '</nav>',
                '<div class="content"></div>',
            '</div>',

            <!-- popup, panel 等放在这里 -->
            '<div class="panel-overlay"></div>',
            '<div class="panel panel-left panel-reveal information_panel"></div>',
            '<div class="modal-overlay"></div>',
        '</div>'
    ].join('');
    return tpl;
});