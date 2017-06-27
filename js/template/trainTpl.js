/**
 * Created by EKO-LKB on 2017/3/29.
 */
define(['zepto'],function () {
    var trainHtml = '';
    trainHtml += '<div class="page page-current" id="train_main">';
    trainHtml += '<header class="bar bar-nav">';
    trainHtml += '<a class="icon icon-me pull-left open-panel"></a>';
    trainHtml += '<h1 class="title">训练</h1>';
    trainHtml += '<span class="icon icon-search pull-right"></span>';
    trainHtml += '</header>';
    trainHtml += '<nav class="bar bar-tab">';
    trainHtml += '<a class="tab-item external active" href="#" id="train">';
    trainHtml += '<span class="icon icon-home"></span>';
    trainHtml += '<span class="tab-label">训练</span>';
    trainHtml += '</a>';
    trainHtml += '<a class="tab-item external" href="#" id="article">';
    trainHtml += '<span class="icon icon-star"></span>';
    trainHtml += '<span class="tab-label">发现</span>';
    trainHtml += '</a>';
    trainHtml += '<a class="tab-item external" href="#" id="mine">';
    trainHtml += '<span class="icon icon-settings"></span>';
    trainHtml += '<span class="tab-label">我的</span>';
    trainHtml += '</a></nav>';
    trainHtml += '<div class="content">';
    trainHtml += '<div class="content-block"></div>';
    trainHtml += '</div></div>';
    $('.page-group').append(trainHtml);
});