/**
 * Created by EKO-LKB on 2017/3/28.
 */
define(function () {
    var tpl = [
         '<div class="searchbar_box">',
            '<div class="searchbar">',
                '<a class="searchbar-cancel">取消</a>',
                '<div class="search-input">',
                    '<label class="icon icon-search" for="search"></label>',
                    '<input type="search" id="search" placeholder="搜索训练课程..."/>',
                '</div>',
            '</div>',
         '</div>',
        '<div class="training_lesson">',
            '<div class="lesson_wrapper">',
                '<h3>课程分类</h3>',
                '<p>丰富的训练课程，规范你的训练过程</p>',
            '</div>',
            '<ul class="lesson_tag clearfix">',
                '{{#trainTypeList}}',
                    '<li data-train_type="{{videoType}}">',
                        '<div class="tag_container">',
                            '<img class="lazy" src="../img/blank.gif" data-echo="{{typeCover}}">',
                            '<div class="mask"></div>',
                            '<div class="tag_info">',
                                '<div class="tag_title">{{videoType}}</div>',
                                '<div class="lesson_count">{{typeNum}}个课程</div>',
                            '</div>',
                        '</div>',
                    '</li>',
                '{{/trainTypeList}}',
            '</ul>',
        '</div>'

    ].join('');
    return tpl;
});
