/**
 * Created by EKO-LKB on 2017/3/29.
 */
define(function () {
    var tpl = [
        '<div class="popup edit_password">',
            '<header class="bar bar-nav">',
                '<h1 class="title">修改密码</h1>',
            '</header>',
            '<div class="content">',
                '<div class="list-block">',
                    '<ul>',
                        '<li class="item-content edit_pwd">',
                            '<div class="item-media"><i class="icon icon-form-name"></i></div>',
                            '<div class="item-inner">',
                                '<div class="item-title label">原密码</div>',
                                '<div class="item-input"><input type="password"></div>',
                            '</div>',
                        '</li>',
                        '<li class="item-content edit_newpwd">',
                            '<div class="item-media"><i class="icon icon-form-name"></i></div>',
                            '<div class="item-inner">',
                                '<div class="item-title label">新密码</div>',
                                '<div class="item-input"><input type="password"></div>',
                            '</div>',
                        '</li>',
                        '<li class="item-content edit_renewpwd">',
                            '<div class="item-media"><i class="icon icon-form-name"></i></div>',
                            '<div class="item-inner">',
                                '<div class="item-title label">重新输入密码</div>',
                                '<div class="item-input"><input type="password"></div>',
                            '</div>',
                        '</li>',
                    '</ul>',
                '</div>',
                '<div class="content-block">',
                    '<div class="row">',
                        '<div class="col-50"><a href="#" class="button button-big button-fill button-success btn_save">保存</a></div>',
                        '<div class="col-50"><a href="#" class="button button-big button-fill button-danger btn_cancel">取消</a></div>',
                    '</div>',
                '</div>',
            '</div>',
        '</div>'
    ].join('');
    return tpl;
});