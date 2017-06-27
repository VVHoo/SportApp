/**
 * Created by EKO-LKB on 2017/3/28.
 */
define(function () {
    //#3A4149    #4D545A
    var tpl = [
        '<div class="user_information">',
            '<div class="panel_top">',
                '<div class="user_avatar">',
                    '<img src="{{userAvatar}}">',
                '</div>',
                '<div class="user_name">{{userName}}</div>',
                '<div class="user_email">{{userEmail}}</div>',
            '</div>',
            '<div class="list-block">',
                '<ul>',
                    '<li class="item-content item-link" id="editInformation">',
                        '<div class="item-inner">',
                            '<span class="icon iconfont icon-bianjiziliao"></span>',
                            '<span>个人信息</span>',
                        '</div>',
                    '</li>',
                    '<li class="item-content item-link" id="editAvatar">',
                        '<div class="item-inner">',
                            '<span class="icon iconfont icon-icon-14"></span>',
                            '<span>更换头像</span>',
                        '</div>',
                        '<input id="upload" type="file" accept="image/*" style="display: none;">',
                    '</li>',
                    '<li class="item-content item-link" id="editPassword">',
                        '<div class="item-inner">',
                            '<span class="icon iconfont icon-xiugaimima"></span>',
                            '<span>修改密码</span>',
                        '</div>',
                    '</li>',
                    '<li class="item-content item-link" id="logout">',
                        '<div class="item-inner">',
                            '<span class="icon iconfont icon-tuichu"></span>',
                            '<span>退出</span>',
                        '</div>',
                    '</li>',
                '</ul>',
            '</div>',
        '</div>'
    ].join('');
    return tpl;
});
